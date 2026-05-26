const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:' + process.env.CONTACT_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.headers.authorization !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Sai chìa khóa bảo mật!' });
  }

  if (req.method === 'POST') {
    const { subscription, title, body } = req.body;
    try {
      await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi gửi Push', details: error });
    }
  } else {
    res.status(405).json({ error: 'Chỉ nhận phương thức POST' });
  }
}
