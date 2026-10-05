export const articles = [
  {
    slug: 'drowning-in-business-admin',
    title: "Drowning in business admin? 12 tasks you don't need to do yourself",
  },
  { slug: 'bookkeeper-vs-accountant', title: 'Bookkeeper vs accountant: which do you actually need?' },
  { slug: 'chase-an-unpaid-invoice', title: 'How to chase an unpaid invoice without making it awkward' },
  { slug: 'do-i-need-a-virtual-assistant', title: "Do I need a virtual assistant? 8 signs it's time" },
  { slug: 'diy-bookkeeping', title: 'DIY bookkeeping: what a sole trader actually needs to keep track of' },
  { slug: 'virtual-assistant-cost-uk', title: 'How much does a virtual assistant cost in the UK?' },
  { slug: 'what-should-you-delegate-first', title: 'What should you delegate first?' },
  { slug: 'organise-business-receipts', title: 'How to organise your business receipts without the paperwork nightmare' },
] as const

const articleContent = import.meta.glob('./articles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

export const getArticleContent = (slug: string) => articleContent[`./articles/${slug}.md`]
