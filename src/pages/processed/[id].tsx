import ShowPictures from "@/components/ShowPictures";
import { useProcessStore } from "@/store";
import altogic from "@/libs/altogic";
import { Prediction } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Page from "@/components/Page";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { cn } from "@/helpers";

export default function Processed() {
  const { originalImage, setOriginalImage, processedImage, reset } = useProcessStore();
  const [prediction, setPrediction] = useState<Prediction>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id, status } = router.query;

  useEffect(() => {
    if (status === "waiting") return;
    setLoading(true);
    altogic.db
      .model("predictions")
      .filter(`id == '${id}'`)
      .getSingle()
      .then(({ errors, data }) => {
        if (errors) return toast("Something went wrong");
        const p = data as Prediction;
        setPrediction(p);
        setOriginalImage(p.originalImage);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (processedImage) router.replace(router.pathname.replace("[id]", id as string));
    return () => {
      if (processedImage) reset();
    };
  }, [processedImage]);

  return (
    <Page>
      <Container
        className={cn(
          "flex flex-col gap-6 md:gap-12 py-5",
          loading && "h-full justify-center items-center"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-10 h-full">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            originalImage && <ShowPictures outputImage={prediction?.output} />
          )}
        </div>
      </Container>
    </Page>
  );
}
