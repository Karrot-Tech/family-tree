import { FC, useEffect, useState } from "react";
import s from "./PwaInstallPrompt.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const PwaInstallPrompt: FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("pwa-install-dismissed");
    if (dismissed === "1") {
      setIsDismissed(true);
      return;
    }

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    setIsInstalled(mediaQuery.matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsDismissed(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (isInstalled || isDismissed || !deferredPrompt) {
    return null;
  }

  return (
    <div className={s.root}>
      <button
        className={s.button}
        onClick={async () => {
          await deferredPrompt.prompt();
          const choice = await deferredPrompt.userChoice;
          if (choice.outcome !== "accepted") {
            window.localStorage.setItem("pwa-install-dismissed", "1");
            setIsDismissed(true);
          }
          setDeferredPrompt(null);
        }}
      >
        Install App
      </button>
    </div>
  );
};

export default PwaInstallPrompt;
