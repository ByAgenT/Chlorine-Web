async function joinRoom(roomID, name) {
  return await fetch('api/member', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ name: name, room_id: Number(roomID) })
  });
}

async function getToken() {
  const response = await fetch('api/token', {
    credentials: 'include'
  });

  return response.json();
}

async function getMemberInfo() {
  const response = await fetch('api/member', {
    credentials: 'include'
  });

  return response.json();
}

async function getRoomMembers() {
  const response = await fetch('api/room/member', {
    credentials: 'include'
  });

  return response.json();
}

export { joinRoom, getToken, getMemberInfo ,getRoomMembers };
