import HomePageContentShort from "../../components/HomePageContentShort";

type ShortDefaultProps = {
  searchParams?: {
    invite?: string | string[];
  };
};

export default function ShortDefault({ searchParams }: ShortDefaultProps) {
  const inviteCode = Array.isArray(searchParams?.invite)
    ? searchParams?.invite[0]
    : searchParams?.invite;

  return <HomePageContentShort variant="default" inviteCode={inviteCode} />;
}
