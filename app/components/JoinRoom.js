import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function JoinRoom( { closeModal } ) {
  const joinButton = useRef();
  const router = useRouter();

  const joinFunction = () => {
    if (joinButton.current) {
      let roomCodeInput = joinButton.current.value;
      roomCodeInput !== '' ? router.push(`../rooms/${roomCodeInput}`) : console.log("Empty input")
    }
  }

  return (
    <div>
      <div onClick={closeModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999999,
        }}
      >
        <div onClick={(e) => e.stopPropagation()} //prevent modal closing on inner section clicks
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            height: "35vh",
            width: "30vw",
          }}
        >
          <div className="flex justify-between">
            <h2 className="mb-4">Enter code</h2>
            <button id="closeModal" className="
            mb-4 px-2 cursor-pointer text-red-600 transition-transform duration-200 hover:scale-120 active:scale-95" 
            onClick={closeModal}>X</button>
          </div>


          <input
            type="text"
            placeholder="Enter a code: "
            autoFocus
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              marginBottom: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            ref={joinButton}
          />

          <button 
            className="w-full p-4 bg-black text-white border 
            border-black rounded-md3 cursor-pointer 
            transition-all duration-250 hover:bg-white hover:text-black"
            onClick={joinFunction}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
