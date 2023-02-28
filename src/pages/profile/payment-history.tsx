import { formatDate, moneyFormat, props, redirect } from "@/helpers";
import altogic from "@/libs/altogic";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { PaginateData, Payment } from "@/types";
import Pagination from "@/components/Pagination";
import Page from "@/components/Page";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function PaymentHistory({
  payments,
  paginateData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <ProfileLayout>
        {payments.length === 0 ? (
          <div className="border p-4 rounded-lg flex items-center md:text-xl justify-center text-center text-gray-700">
            You do not have any payment history.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-white border-gray-200 shadow-sm rounded-lg border p-4"
                >
                  <div className="flex items-center">
                    <dl className="flex-1 grid sm:grid-cols-2 gap-2 md:grid-cols-4">
                      <div>
                        <dt className="font-medium text-gray-900">Payment number</dt>
                        <dd className="mt-1 text-gray-500 select-all">
                          #{payment.paymentNumber?.toString().padStart(6, "0")}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Payment detail</dt>
                        <dd className="mt-1 text-gray-500 select-all">
                          {payment.plan.name} Plan - {payment.plan.credit} credits
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Payment date</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={payment.createdAt}>
                            {formatDate(new Date(payment.createdAt))}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="mt-1 font-medium text-gray-500">
                          {moneyFormat(payment.amount)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
            <Pagination paginateData={paginateData} />
          </div>
        )}
      </ProfileLayout>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session_token } = context.req.cookies;
  if (!session_token) return redirect("/");
  // @ts-ignore
  altogic.auth.setSession({ token: session_token });

  const searchParams = new URLSearchParams(context.req.url?.toString().split("?")[1]);
  searchParams.set("limit", "10");

  const { data, errors } = await altogic.endpoint.get("/payments?" + searchParams.toString());
  console.log(data, errors);
  const { payments, paginateData } = data as { payments: Payment[]; paginateData: PaginateData };

  return props({
    payments,
    paginateData,
  });
}
