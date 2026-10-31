import Closing from './components/Closing';
import Gallery from './components/Gallery';
import Greeting from './components/Greeting';
import Guestbook from './components/Guestbook';
import Information from './components/Information';
import Intro from './components/Intro';
import LeafDivider from './components/LeafDivider';
import Location from './components/Location';
import Rsvp from './components/Rsvp';
import WeddingDate from './components/WeddingDate';

// 청첩장은 DB 를 읽지 않는 정적 페이지다 (참석 의사·방명록은 쓰기만 하고, 목록은 관리자 화면에서 본다).
export default function InvitationPage() {
  return (
    <>
      <Intro />
      <Greeting />
      <WeddingDate />
      <LeafDivider variant="wave" />
      <Location />
      <Information />
      <Gallery />
      <Rsvp />
      <Guestbook />
      <Closing />
    </>
  );
}
