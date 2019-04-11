function joinRoom(roomID, name) {
  return fetch('/member', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ name: name, room_id: Number(roomID) })
  });
}

export { joinRoom };
