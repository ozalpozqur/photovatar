import Page from "@/components/Page";
import Image from "next/image";
import { IoIosImages } from "react-icons/io";
import { BsDownload, BsArrowRight, BsUpload } from "react-icons/bs";
import { CiEraser } from "react-icons/ci";
import { serverSideAltogic } from "@/libs/altogic";
import { Plan } from "@/types";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { cn, http } from "@/helpers";
import { useAuth, useModalStore } from "@/store";
import Loading from "@/components/Loading";
import { MagicWand } from "@/components/Editor/Tools";
import TryItNowButton from "@/components/TryItNowButton";

interface PlanWithLoading extends Plan {
  loading: boolean;
}
export default function Index({ plans }: { plans: PlanWithLoading[] }) {
  return (
    <Page>
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing plans={plans} />
      <Testimonials />
      <FAQ />
      <GetStarted />
    </Page>
  );
}
Index.displayName = "Home";

export async function getServerSideProps() {
  const { data } = await serverSideAltogic().db.model("plans").get();
  return {
    props: {
      plans: data as Plan[],
    },
  };
}

function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-0 py-10 md:py-20 text-center lg:py-32 relative !pt-0">
      <img
        className="w-[400px] lg:h-[368px] top-0 mx-auto"
        src="/home-hero.webp"
        alt="Hero Image"
      />
      <h1 className="mx-auto max-w-5xl font-display font-medium tracking-tight !leading-[normal] text-slate-900 text-3xl sm:text-5xl md:text-7xl">
        Create stunning{" "}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">avatars</span>
        </span>
        <br />
        with power of AI
      </h1>
      <p className="mx-auto mt-6 max-w-lg md:max-w-xl sm:text-lg tracking-tight font-light text-slate-700">
        With our powerful customization and AI powered features, create stunning avatars that
        capture your personality and style. Power up your online presence and get creative today!
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <TryItNowButton className="group inline-flex items-center justify-center text-lg rounded-full py-3 px-6 font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900" />
      </div>
    </div>
  );
}
function Features() {
  const features = [
    {
      title: "Remove backgrounds",
      content: "Easily remove backgrounds from your avatar images with just a few clicks.",
      icon: <CiEraser className="md:w-10 w-8 h-8 md:h-10" />,
    },
    {
      title: "Enhance the quality",
      content: "Enhance the quality of your avatar with our state-of-the-art AI technology.",
      icon: <MagicWand className="md:w-10 w-8 h-8 md:h-10" />,
    },
    {
      title: "Unique backgrounds or borders",
      content: "Customize your avatar with unique backgrounds or borders.",
      icon: <IoIosImages className="md:w-10 w-8 h-8 md:h-10" />,
    },
    {
      title: "Download avatars",
      content: "Download avatars in various sizes and formats.",
      icon: <BsDownload className="md:w-10 w-8 h-8 md:h-10" />,
    },
  ];
  return (
    <section id="features" className="py-20 sm:py-32 relative overflow-hidden bg-blue-600">
      <Image
        alt="features"
        src="/features-bg.jpg"
        width="2245"
        height="1636"
        loading="lazy"
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-60%]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-display font-medium tracking-tight text-white">Features</h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-2"
        >
          {features.map((feature, id) => (
            <li
              key={id}
              style={{ backdropFilter: "blur(40px)" }}
              className="relative p-10 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-90"
            >
              {feature.icon}
              <h3 className="mt-6 font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-800">{feature.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function HowItWorks() {
  const sections = [
    {
      text: (
        <>
          Upload Your <br />
          Photo
        </>
      ),
      icon: <BsUpload className="w-12 h-12 sm:w-8 sm:h-8 xl:w-10 xl:h-10" />,
    },
    {
      text: (
        <>
          Use Background <br />
          Removal
        </>
      ),
      icon: <CiEraser className="w-12 h-12 sm:w-8 sm:h-8 xl:w-12 xl:h-12" />,
    },
    {
      text: (
        <>
          Choose Custom <br />
          Background
        </>
      ),
      icon: <IoIosImages className="w-12 h-12 sm:w-8 sm:h-8 xl:w-10 xl:h-10" />,
    },
    {
      text: (
        <>
          Download Your <br />
          Avatar
        </>
      ),
      icon: <BsDownload className="w-12 h-12 sm:w-8 sm:h-8 xl:w-10 xl:h-10" />,
    },
  ];
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="text-4xl font-display font-medium tracking-tight text-slate-900">
            How it Works
          </h2>
        </div>
        <div className="mx-auto mt-16 grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]  gap-y-10 gap-x-4 xl:gap-x-6 lg:mt-20">
          {sections.map((section, id) => (
            <Fragment key={id}>
              <div className="hover:scale-105 transition relative flex flex-col gap-4 xl:gap-6 rounded-2xl bg-white p-4 xl:p-6 shadow shadow-slate-900/10 h-full">
                <div className="text-slate-700 flex justify-center h-14 sm:h-10 flex items-center xl:h-14">
                  {section.icon}
                </div>
                <div className="relative">
                  <p className="text-center text-xl sm:text-lg tracking-tight text-slate-600">
                    {section.text}
                  </p>
                </div>
              </div>
              {id !== sections.length - 1 && (
                <BsArrowRight className="rotate-90 md:rotate-0 text-slate-400 justify-self-center self-center w-10 h-10" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  const testimonials = [
    {
      name: "Özgür Özalp",
      socialMedia: "@ozqurozalp",
      link: "https://twitter.com/ozqurozalp",
      title: "Software Engineer",
      avatar: "/img/testimonials/ozgurozalp.jpg",
      content:
        "Photovatar made it easy to create a professional-looking avatar with clear, high-quality images. The background removal tool was especially helpful. Highly recommend!",
    },
    {
      name: "Evren Vural",
      socialMedia: "@evrenvural",
      link: "https://github.com/evrenvural",
      title: "Software Engineer",
      avatar: "/img/testimonials/evrenvural.jpeg",
      content:
        "The image quality is amazing and the background removal tool is incredibly accurate. I created an amazing avatar in just a few minutes.",
    },
    {
      name: "Alper Sarı",
      socialMedia: "@alpernbt",
      link: "https://www.linkedin.com/in/alpernbt/",
      title: "Developer Relations",
      avatar: "/img/testimonials/alpersari.jpg",
      content:
        "I created a polished, engaging avatar in just a few minutes. Definitely recommend trying it out",
    },
  ];
  return (
    <section id="testimonials" className="bg-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="text-4xl font-display font-medium tracking-tight text-slate-900">
            Testimonials
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, id) => (
            <li key={id}>
              <figure className="relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 h-full">
                <svg
                  aria-hidden="true"
                  width={105}
                  height={78}
                  className="absolute top-6 left-6 fill-slate-100"
                >
                  <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
                </svg>
                <blockquote className="relative">
                  <p className="text-lg font-light tracking-tight text-slate-600">
                    {testimonial.content}
                  </p>
                </blockquote>
                <figcaption className="relative mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div className="font-display leading-[normal] flex flex-col text-base text-slate-900">
                      <span>{testimonial.name}</span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-blue-500"
                        href={testimonial.link}
                      >
                        <small>{testimonial.socialMedia}</small>
                      </a>
                    </div>
                    <div className="mt-2 text-sm text-slate-500">{testimonial.title}</div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <Image
                      className="aspect-square object-cover"
                      width={56}
                      height={56}
                      draggable={false}
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function Pricing({ plans }: { plans: PlanWithLoading[] }) {
  const [_plans, setPlans] = useState(plans);
  const { user } = useAuth();
  const { setLoginModalIsOpen } = useModalStore();

  const setLoading = (plan: Plan, loading: boolean) => {
    setPlans((plans) =>
      plans.map((p) => {
        if (p._id === plan._id) return { ...p, loading };
        return p;
      })
    );
  };
  async function startCheckout(plan: Plan) {
    if (!user) {
      toast.dismiss();
      toast.warning("Please log in to your account to make a purchase.", { position: "top-left" });
      return setLoginModalIsOpen(true);
    }
    setLoading(plan, true);
    const { url, errors } = await http.post<{ url: string; errors: any }>("/api/add-balance", {
      plan,
    });
    setLoading(plan, false);
    if (errors) return toast.error("Something went wrong, please try again later");
    location.href = url;
  }

  return (
    <section id="pricing" aria-label="Pricing" className="bg-slate-900 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:text-center">
          <h2 className="font-display tracking-tight text-white text-4xl">
            <span className="relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 281 40"
                className="absolute top-1/2 left-0 h-[1em] w-full fill-blue-400"
                preserveAspectRatio="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
                />
              </svg>
              <span className="relative">Pricing</span>
            </span>
          </h2>
        </div>
        <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          {_plans.map((plan) => (
            <section
              key={plan._id}
              className={cn(
                "flex flex-col rounded-3xl px-6 sm:px-8 lg:py-8",
                plan.name.toLowerCase() === "mid"
                  ? "order-first bg-blue-600 py-8 lg:order-none"
                  : "lg:py-8"
              )}
            >
              <h3 className="mt-5 font-display text-lg text-white">
                {plan.name} Plan{" - "}
                <span className="relative whitespace-nowrap">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 281 40"
                    className="absolute top-1/2 left-0 h-[1em] w-full fill-blue-400"
                    preserveAspectRatio="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
                    />
                  </svg>
                  <span className="relative">{plan.credit} Credits</span>
                </span>
              </h3>
              <p className="order-first font-display text-5xl font-light tracking-tight text-white">
                ${plan.price}
              </p>
              <button
                disabled={plan.loading}
                onClick={() => startCheckout(plan)}
                className={cn(
                  "group relative inline-flex items-center justify-center rounded-full py-2 px-4 font-semibold mt-8 focus-visible:outline-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
                  plan.name.toLowerCase() === "mid"
                    ? "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600"
                    : "ring-1 ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400"
                )}
              >
                {plan.loading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Loading className="w-8 h-8" />
                  </span>
                )}
                <span className={cn(plan.loading && "!text-transparent")}>Get started today</span>
              </button>
            </section>
          ))}
        </div>
        <div
          role="alert"
          className="rounded border-l-4 border-blue-500 bg-blue-50 w-fit mx-auto p-4 mt-5"
        >
          <strong className="block font-medium text-blue-800">
            You can test the checkout flow with the following test credit card
          </strong>
          <ul className="mt-2 text-sm tabular-nums">
            <li>Card number: 4242 4242 4242 4242</li>
            <li>Expiration date: Any future date like 12/35</li>
            <li>CVC: Any 3 digits</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  const faqs = [
    {
      question: "What is a credit?",
      answer:
        "A credit is a single use token that can be redeemed for a single use of the service.",
    },
    {
      question: "What is a plan?",
      answer: "A plan that gives you a certain amount of credits once payment is made.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take data security seriously and have robust measures in place to protect user information.",
    },
    {
      question: "What file formats can I upload?",
      answer: "You can upload JPEG, PNG, and other image formats.",
    },
    {
      question: "What file formats can I download?",
      answer: "You can download JPEG, PNG, and other image formats.",
    },
    {
      question: "How do I get started?",
      answer: "You can get started by creating an account and uploading your first image.",
    },
    {
      question: "What is the maximum file size I can download?",
      answer: "You can download files up to 10MB in size.",
    },
    {
      question: "Do I need any special software to use the app?",
      answer: "No, our app is web-based and can be accessed through any browser.",
    },
    {
      question: "What is the maximum file size I can upload?",
      answer: "You can upload files up to 10MB in size.",
    },
  ];
  return (
    <section id="faqs" className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
      <Image
        alt=""
        src="/faq-bg.jpg"
        width={1558}
        height={946}
        decoding="async"
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        loading="lazy"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for,{" "}
            <a
              target="_blank"
              className="underline underline-offset-2 text-indigo-500"
              href="mailto:info@altogic.com"
            >
              email
            </a>{" "}
            our support team and someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((faq, i) => (
            <li key={i}>
              <h3 className="font-display text-lg leading-7 text-slate-900">{faq.question}</h3>
              <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function GetStarted() {
  return (
    <section id="get-started-today" className="relative overflow-hidden bg-blue-600 py-32">
      <Image
        alt="Get started"
        src="/bg-get-started.jpg"
        width={2347}
        height={1244}
        decoding="async"
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        loading="lazy"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to create amazing avatars with using codeformer and modnet AI models.
          </p>
          <TryItNowButton className="group inline-flex items-center justify-center rounded-full text-lg py-3 px-6 font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mt-10" />
        </div>
      </div>
    </section>
  );
}
