// ============================================================
//  ALL INVITATION CONTENT LIVES HERE – edit this file only.
//  (Details below are taken from your recorded page. Change freely.)
// ============================================================
export const invitation = {
  hashtag: '#RoSe',
  saveTheDate: 'Save the date - 7th September',

  groomShort: 'Dr.Rohith',
  brideShort: 'Dr.Seema',

  groom: {
    name: 'Rohith Raj',
    role: 'GROOM',
    parents: ['Rajender', 'Shobha Rani'],
    place: 'Sagara colony KU, Hanamkonda',
  },
  bride: {
    name: 'Seema Preetham',
    role: 'BRIDE',
    parents: ['Surya Narayana', 'Sumangali'],
    place: 'Gopalpur, Hanamkonda',
  },

  ceremonyTitle: 'Engagement Ceremony',
  inviteLines: [
    'Two hearts, one beautiful beginning…',
    'With immense joy,',
    'we cordially invite you to join us',
    'as we celebrate the beginning of our forever.',
    'Your presence will make our day even more special.',
  ],

  // month is 1-12
  date: { year: 2026, month: 9, day: 7 },
  time: '09:15',
  partyTitle: 'Engagement Party Info',

  venue: {
    title: 'Engagement Party Venue',
    name: 'Shubhamasthu Convention Hall',
    address:
      'Shubhamasthu Convention Hall, near Svs College, beside Radhika Hospital, Bheemaram, Hanamkonda, Telangana 506015',
  },

  dressCode: {
    title: 'No Dress Code',
    lines: ['just come as you are.', 'You look beautiful in every attire,', 'and your presence is all that matters to us. ✨'],
  },

  schedule: [
    { time: '09:00', text: 'Welcome', icon: 'bell' },
    { time: '11:00', text: 'starters and drinks', icon: 'music' },
    { time: '12:30', text: 'Rings exchange', icon: 'rings' },
    { time: '13:00', text: 'Main Course', icon: 'food' },
  ],

  // Put your real photos in /public/images/photos and list them here
  gallery: [
    '/images/photos/photo-1.svg',
    '/images/photos/photo-2.svg',
    '/images/photos/photo-3.svg',
    '/images/photos/photo-4.svg',
  ],

  closing: 'Your presence would be the greatest gift we could receive!',
  footerCredit: '© made with React & Material UI',

  // WhatsApp number (country code, digits only) to receive RSVPs. Leave '' to disable.
  whatsapp: '',

  // sample guest wishes shown first in the guestbook
  seedWishes: [
    { name: 'Anil', message: 'Hearty congratulations to you both! 🎉', at: '2026-09-06T19:23:00' },
    { name: 'Priya', message: 'Wishing you a lifetime of love and happiness. #RoSe', at: '2026-09-05T12:37:00' },
    { name: 'Kiran', message: 'Congratulations! Looking forward to the celebration.', at: '2026-09-04T10:19:00' },
  ],
};
