import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Nutjar } from "nutjar.js";
import QRCode from "react-qr-code";

const jar = new Nutjar(
  "https://mint.minibits.cash/Bitcoin",
  "npub1mhcr4j594hsrnen594d7700n2t03n8gdx83zhxzculk6sh9nhwlq7uc226",
  ["wss://relay.damus.io"],
);

function Content({ close }) {
  const [invoice, setInvoice] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isError, setIsError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  async function getInvoice() {
    if (!inputRef.current?.valueAsNumber) {
      return;
    }
    jar.tip(inputRef.current.valueAsNumber, "Demo", {
      onInvoice: setInvoice,
      onSuccess: () => {
        setIsPaid(true);
      },
      onError: (e) => {
        if (e instanceof Error) {
          setIsError(e.message);
        } else {
          console.error(e);
          setIsError("Something went wrong");
        }
      },
    });
  }

  return (
    <>
      <div className="inset-0 bg-black opacity-80 fixed " />
      <div className="fixed inset-0 w-full flex justify-center items-center">
        <dialog
          open
          className="flex flex-col justify-center items-center gap-2 p-2 rounded bg-zinc-800"
        >
          <div className="flex flex-col bg-zinc-700 items-center gap-4 p-4 rounded">
            <p className="text-lg font-bold">Support my work!</p>
            {(() => {
              <p>A Modal</p>;
              if (isPaid) {
                return <p>Paid successfully!</p>;
              }
              if (isError) {
                return <p>{isError}</p>;
              }
              if (invoice) {
                return (
                  <div className="p-2 rounded bg-white">
                    <QRCode value={invoice} />
                  </div>
                );
              }
              return (
                <>
                  <div className="flex gap-1 items-center">
                    <input
                      type="number"
                      ref={inputRef}
                      className="p-2 rounded appearance-none"
                    />
                    <p>SATS</p>
                  </div>
                  <button
                    onClick={getInvoice}
                    className="px-2 py-1 bg-zinc-200 rounded text-black"
                  >
                    Request Invoice
                  </button>
                </>
              );
            })()}
          </div>
          <button onClick={close} className="text-xs">
            Close Modal
          </button>
        </dialog>
      </div>
    </>
  );
}

function DonationModal({ close }) {
  return createPortal(
    <Content close={close} />,
    document.getElementById("modal")!,
  );
}

export default DonationModal;
