export default function getAvatar(user) {
  if (!user) return "";

  return `https://api.dicebear.com/7.x/bottts/svg?seed=${
    user.uuid || user.email || user.name
  }`;
}
