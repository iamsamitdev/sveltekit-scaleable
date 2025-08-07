// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { User } from '$lib/types'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User
			token?: string
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
