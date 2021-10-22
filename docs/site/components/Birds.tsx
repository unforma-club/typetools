import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Bird from "components/Bird";

export const Birds = () => {
    const newArr = new Array(6).fill("");
    return (
        <Canvas
            camera={{ position: [0, 0, 35] }}
            flat
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                userSelect: "none",
                pointerEvents: "none",
                zIndex: 2000,
            }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[40, 40, 40]} />
            <Suspense fallback={null}>
                {newArr.map((_, i) => {
                    const x =
                        (15 + Math.random() * 30) *
                        (Math.round(Math.random()) ? -1 : 1);
                    const y = -10 + Math.random() * 20;
                    const z = -5 + Math.random() * 5;
                    const bird = ["stork", "parrot"][
                        Math.round(Math.random() * 1)
                    ];
                    let speed = bird === "stork" ? 0.25 : 1;
                    let factor =
                        bird === "stork"
                            ? 0.25 + Math.random()
                            : 1 + Math.random() - 0.05;

                    return (
                        <Bird
                            key={i}
                            position={[x, y, z]}
                            rotation={[0, x > 0 ? Math.PI : 0, 0]}
                            speed={speed}
                            factor={factor}
                            url={`/glb/${bird}.glb`}
                        />
                    );
                })}
            </Suspense>
        </Canvas>
    );
};

export default Birds;
