import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'أصيل الصبري', // فقط الاسم في شريط العنوان
  description: '', // يمكنك تركها فارغة أو كتابة عبارة قصيرة جداً مثل '🎁'
  openGraph: {
    title: 'أصيل الصبري',
    description: '', // فارغ، أو يمكنك وضع 'فرصة العمر' إذا أردت
    images: [
      {
        url: '/gift-box.png', // الصورة تبقى للمشاركة الجذابة
        width: 1200,
        height: 630,
        alt: 'صندوق هدايا رمضان',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أصيل الصبري',
    description: '',
    images: ['/gift-box.png'],
  },
};

export default function Page() {
  return <ClientPage />;
}