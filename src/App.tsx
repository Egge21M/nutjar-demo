import { useState } from "react";
import DonationModal from "./DonationModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="w-full bg-zinc-700 flex items-center justify-between p-4">
        <p className="font-bold text-xl">nutjar.js demo</p>
        <a>GitHub</a>
      </nav>
      <main className="max-w-lg p-4 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Lorem Ipsum</h1>
        <div className="flex flex-col gap-2 max-w-lg">
          <p>
            Lorem ipsum dolor sit amet. Id sint accusantium hic deserunt porro
            33 perferendis mollitia ut dolores dicta. Est sapiente quidem et
            odio quidem et voluptatem laborum sed cumque esse et nobis eius ut
            nihil provident. Qui laborum dolore et doloribus ipsum sit placeat
            expedita vel totam exercitationem et nemo excepturi est rerum sequi
            et eius nisi. Ut consequatur explicabo eum harum totam et dolores
            voluptatum aut impedit libero. Vel expedita velit eos beatae rerum
            qui quasi esse et odio maxime. Ut incidunt maxime sit nihil
            recusandae est dolorem adipisci qui minima recusandae et iste
            adipisci. Sed deserunt nihil id voluptas provident in omnis
            voluptatum quo consequuntur sequi non reiciendis modi et itaque
            quia? Et aliquam temporibus est rerum corporis non optio fugiat eos
            quam debitis et sapiente nihil. Et porro accusamus qui assumenda
            rerum quo galisum consequuntur qui eaque esse ex quae enim et
            similique voluptas eum necessitatibus reiciendis.{" "}
          </p>
        </div>
        <button
          className="py-1 px-2 bg-white rounded text-black self-start transition hover:bg-black hover:text-white"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Support my work!
        </button>
      </main>
      {isOpen ? (
        <DonationModal
          close={() => {
            setIsOpen(false);
          }}
        />
      ) : undefined}
    </>
  );
}

export default App;
