import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Redirection = {
  path: string;
  delay?: number;
}

const useRedirection = () => {
  const router = useRouter();

  const redirect = useCallback(({ path, delay = 0 }: Redirection) => {
    if (delay === 0) {
      router.push(path);
      return;
    }

    setTimeout(() => {
      router.push(path);
    }, delay);
  }, [router]);

  return { redirect };
};

export default useRedirection;
