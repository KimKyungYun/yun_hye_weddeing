-- 방명록을 쓰기 전용으로 바꾼다 (목록은 관리자만 본다).
-- 하객이 자기 글을 지울 일이 없어 삭제용 비밀번호 해시를 지운다.
ALTER TABLE "guestbook_entries" DROP COLUMN "password_hash";
