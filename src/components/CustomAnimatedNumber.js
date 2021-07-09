import React, { useEffect, useState } from 'react'
import AnimatedNumber from "react-animated-numbers"
import './CustomAnimatedNumber.css'




export default function CustomAnimatedNumber({ caseType, textColor, number }) {
    const [windowWidth, setWindowWidth] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', () => { setWindowWidth(window.innerWidth) });
    })

    return (
        <div className='anim-number-container'>
            <h2 className="font-1" style={{ color: textColor }}>
                {caseType} :
            </h2>
            <AnimatedNumber
                key={windowWidth}
                animateToNumber={number}
                fontStyle={{ fontFamily: "Nunito", fontSize: 'var(--title-size)' }}
                includeComma
                config={{ mass: 1, tension: 280, friction: 120 }}
                onStart={() => console.log("onStart")}
                onFinish={() => console.log("onFinish")}
                animationType={"calm"}
            />

        </div>
    )
}
