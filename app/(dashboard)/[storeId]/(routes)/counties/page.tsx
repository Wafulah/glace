import { Metadata } from 'next';
import { format,parseISO } from "date-fns";
import { redirect } from 'next/navigation';
import { currentUser } from "@/lib/auth";

import { getCounties } from "@/actions/get-counties";
import { CountyColumn } from "./components/columns"
import { CountiesClient } from "./components/client";

export const metadata: Metadata = {
    title: 'Counties',
  };

const CountiesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  

  const user = await currentUser(); 
  const counties = await getCounties(params.storeId,user?.jwt_token as string);

  const formattedCounties: CountyColumn[] = counties.map((item) => ({
    id: item.id,
    name: item.name,
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CountiesClient data={formattedCounties} />
      </div>
    </div>
  );
};

export default CountiesPage;
