export const users = [];
export const notes = [];

let currentUserId = 1;
let currentNoteId = 1;

export function getNextUserId() {
    return String(currentUserId++);
}

export function getNextNoteId() {
    return String(currentNoteId++);
}