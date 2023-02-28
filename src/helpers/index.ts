import { format, isToday, isYesterday } from "date-fns";

export function cn(...classNames: any[]) {
  return classNames.filter(Boolean).join(" ");
}
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function moneyFormat(number: number) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}
export function formatDate(date: Date) {
  if (isToday(date)) return `Today at ${format(date, "p")}`;
  if (isYesterday(date)) return `Yesterday at ${format(date, "p")}`;
  return format(date, "P p");
}
export function props<T>(props: T) {
  return {
    props: props,
  };
}
export function redirect(path: string, permanent = false) {
  return {
    redirect: {
      destination: path,
      permanent,
    },
  };
}

export const http = {
  async fetch(url: string, method: "GET" | "POST" | "PUT" | "DELETE", params?: any) {
    const isFormData = params instanceof FormData;
    let body: any = params ? (isFormData ? params : JSON.stringify(params)) : null;
    const res = await fetch(url, {
      method,
      ...(!isFormData && {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      ...(body && { body }),
    });
    if (res.status !== 200) throw { status: res.status, body: await res.json() };
    return res.json();
  },
  get<T>(url: string) {
    return this.fetch(url, "GET") as Promise<T>;
  },
  post<T>(url: string, params: any) {
    return this.fetch(url, "POST", params) as Promise<T>;
  },
};
