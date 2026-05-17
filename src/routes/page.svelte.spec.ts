import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render headers', async () => {
		await render(Page);

		const headings = page.getByRole('heading', { level: 2 });

		const headingList = headings.all();

		expect(headingList.length).toBe(2);
		for (const heading of headingList) {
			await expect.element(heading).toBeVisible();
		}
	});
});
