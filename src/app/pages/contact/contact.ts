import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CopyButton } from '../../components/copy-button/copy-button';
import { Icon } from '../../components/icon/icon';
import { PROFILE, SOCIAL_LINKS } from '../../data/profile.data';

/**
 * Contact page.
 *
 * The site has no backend, so the form does not send email itself.
 * When the form is valid it opens the visitor's email app (a "mailto:" link)
 * with the name, email and message already filled in.
 *
 * What's typed is saved in the browser (localStorage) as a draft, so it isn't
 * lost if the visitor leaves the page and comes back.
 */
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon, CopyButton],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly document = inject(DOCUMENT);

  protected readonly email = PROFILE.email;
  protected readonly availability = PROFILE.availability;

  /** Links with a real URL, plus a short readable version like "github.com/khaled-23". */
  protected readonly links = SOCIAL_LINKS.filter((link) => link.url !== '').map((link) => ({
    ...link,
    display: link.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
  }));

  protected readonly minMessageLength = 20;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(this.minMessageLength)]],
  });

  /** The message as a signal, for the live character count. */
  private readonly message = toSignal<string, string>(this.form.controls.message.valueChanges, {
    initialValue: '',
  });
  protected readonly messageLength = computed(() => this.message().length);

  /** True when a saved draft was put back into the form. */
  protected readonly draftRestored = signal(false);

  /** True after the first submit attempt, so errors show even on untouched fields. */
  protected readonly submitted = signal(false);
  /** True once the email app has been opened. */
  protected readonly opened = signal(false);

  constructor() {
    this.restoreDraft();
    // Save the draft as the visitor types
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value: unknown) => {
      this.writeDraft(JSON.stringify(value));
    });
  }

  /** Show a field's error once the visitor has left the field or tried to submit. */
  protected showError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.form.getRawValue();
    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;

    this.document.location.href =
      `mailto:${this.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    this.opened.set(true);
    this.writeDraft(null);
    this.draftRestored.set(false);
  }

  protected clearForm(): void {
    this.form.reset();
    this.submitted.set(false);
    this.draftRestored.set(false);
    this.writeDraft(null);
  }

  private restoreDraft(): void {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null');
      if (!saved || typeof saved !== 'object') {
        return;
      }
      const draft = saved as Record<string, unknown>;
      const text = (key: string) => (typeof draft[key] === 'string' ? draft[key] : '');
      const value = { name: text('name'), email: text('email'), message: text('message') };
      if (value.name || value.email || value.message) {
        this.form.setValue(value);
        this.draftRestored.set(true);
      }
    } catch {
      // Storage blocked or draft unreadable: start with an empty form
    }
  }

  /** Save (or with null, delete) the draft. Fails quietly if storage is blocked. */
  private writeDraft(json: string | null): void {
    try {
      if (json === null) {
        localStorage.removeItem(DRAFT_KEY);
      } else {
        localStorage.setItem(DRAFT_KEY, json);
      }
    } catch {
      // Private browsing or storage turned off: drafts just aren't kept
    }
  }
}

const DRAFT_KEY = 'portfolio-contact-draft';
