import { describe, expect, it } from 'vitest';
import { addCard, deleteCard, initialBoard, moveCard, renameColumn } from '../app/board';

describe('board operations', () => {
  it('starts with exactly five populated columns', () => { expect(initialBoard).toHaveLength(5); expect(initialBoard.every(c => c.cards.length > 0)).toBe(true); });
  it('adds cards to the chosen column and rejects empty titles', () => { const card = { id: 'new', title: 'کار', details: '' }; expect(addCard(initialBoard, 'todo', card)[1].cards.at(-1)).toEqual(card); expect(addCard(initialBoard, 'todo', { ...card, title: '  ' })).toBe(initialBoard); });
  it('deletes only the selected card', () => { const board = deleteCard(initialBoard, '1'); expect(board[0].cards.map(c => c.id)).toEqual(['2']); expect(board[1]).toEqual(initialBoard[1]); });
  it('renames a column, trimming whitespace and rejecting empty names', () => { expect(renameColumn(initialBoard, 'ideas', ' جدید ')[0].name).toBe('جدید'); expect(renameColumn(initialBoard, 'ideas', '  ')).toBe(initialBoard); });
  it('moves a card to an empty column without duplication', () => { const empty = initialBoard.map(c => c.id === 'done' ? { ...c, cards: [] } : c); const result = moveCard(empty, '1', 'done'); expect(result[0].cards.some(c => c.id === '1')).toBe(false); expect(result[4].cards.map(c => c.id)).toEqual(['1']); expect(moveCard(result, '1', 'done')).toBe(result); });
  it('ignores invalid card and destination ids', () => { expect(moveCard(initialBoard, 'missing', 'done')).toBe(initialBoard); expect(moveCard(initialBoard, '1', 'missing')).toBe(initialBoard); });
});
