export type Card = { id: string; title: string; details: string };
export type Column = { id: string; name: string; cards: Card[] };
export const initialBoard: Column[] = [
  { id: 'ideas', name: 'ایده‌ها', cards: [{ id: '1', title: 'ایده‌پردازی برای پروژه', details: 'ایده‌های اولیه را جمع‌آوری و مسیر پروژه را مشخص کنیم.' }, { id: '2', title: 'بررسی نیازهای کاربران', details: 'خواسته‌ها و دغدغه‌های اصلی کاربران را بشناسیم.' }] },
  { id: 'todo', name: 'برای انجام', cards: [{ id: '3', title: 'برنامه‌ریزی مراحل کار', details: 'کارهای پیش رو را به قدم‌های کوچک‌تر تقسیم کنیم.' }, { id: '4', title: 'جمع‌آوری نمونه‌های الهام‌بخش', details: 'نمونه‌های خوب را برای شروع کنار هم قرار دهیم.' }] },
  { id: 'doing', name: 'در حال انجام', cards: [{ id: '5', title: 'طراحی تجربه کاربری', details: 'یک تجربه ساده و دلنشین برای کاربران بسازیم.' }, { id: '6', title: 'آماده‌سازی محتوای اولیه', details: 'متن‌ها و محتوای مورد نیاز را آماده کنیم.' }] },
  { id: 'review', name: 'در حال بررسی', cards: [{ id: '7', title: 'بازبینی طرح اولیه', details: 'جزئیات را بررسی و بازخوردها را جمع‌بندی کنیم.' }] },
  { id: 'done', name: 'انجام شده', cards: [{ id: '8', title: 'شروع پروژه', details: 'اولین قدم را برداشتیم؛ مسیر از اینجا شروع می‌شود.' }] },
];
export function addCard(board: Column[], columnId: string, card: Card): Column[] { if (!card.title.trim()) return board; return board.map(c => c.id === columnId ? { ...c, cards: [...c.cards, card] } : c); }
export function deleteCard(board: Column[], cardId: string): Column[] { return board.map(c => ({ ...c, cards: c.cards.filter(card => card.id !== cardId) })); }
export function renameColumn(board: Column[], columnId: string, name: string): Column[] { const trimmed = name.trim(); return trimmed ? board.map(c => c.id === columnId ? { ...c, name: trimmed } : c) : board; }
export function moveCard(board: Column[], cardId: string, targetId: string): Column[] { const source = board.find(c => c.cards.some(card => card.id === cardId)); const target = board.find(c => c.id === targetId); if (!source || !target || source.id === target.id) return board; const card = source.cards.find(c => c.id === cardId)!; return board.map(c => c.id === source.id ? { ...c, cards: c.cards.filter(item => item.id !== cardId) } : c.id === target.id ? { ...c, cards: [...c.cards, card] } : c); }
