import React from 'react';
import { useSpring, animated } from 'react-spring';

export const NotFound = () => {
    // Define the animation properties using useSpring
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        reset: true,
    });

    const floatUp = useSpring({
        from: { transform: 'translateY(50px)' },
        to: { transform: 'translateY(0)' },
        config: { tension: 200, friction: 12 },
        reset: true,
    });

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', marginLeft: '450px' }}>
            <animated.div style={fadeIn}>
                <h1 style={{ fontSize: '4em', color: '#333' }}>404</h1>
            </animated.div>
            <animated.div style={floatUp}>
                <p style={{ fontSize: '1.5em', color: '#555' }}>Oops! Page not found.</p>
            </animated.div>
            <animated.img
                src="https://i.gifer.com/yH.gif"
                alt="Lost astronaut"
                style={{ width: '300px', height: '300px', marginTop: '50px' }}
            />
        </div>
    );
};

export default NotFound;
