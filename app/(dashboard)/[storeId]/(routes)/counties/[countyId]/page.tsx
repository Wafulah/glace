import { currentUser } from "@/lib/auth";
import { CountyForm } from "./components/county-form";
import { getCounty } from "@/actions/get-county";

const CountyPage = async ({
  params,
}: {
  params: { countyId: string; storeId: string };
}) => {
  const user = await currentUser();
  const county = await getCounty(
    params.storeId,
    user?.session_token as string,
    params.countyId
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CountyForm initialData={county} />
      </div>
    </div>
  );
};

export default CountyPage;
