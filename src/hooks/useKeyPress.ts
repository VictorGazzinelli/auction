import { useEffect } from 'react';
import { useBoolean } from 'react-hanger';

const useKeyPress = (targetKey: string) => {
    const keyPressed = useBoolean(false);

    // If pressed key is our target key then set to true
    function downHandler({ key }:any) {
        if (key === targetKey) {
            keyPressed.setTrue();
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }:any) => {
        if (key === targetKey) {
            keyPressed.setFalse();
        }
    };

    // Add event listeners
    const onComponentMount = () => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
    };
    useEffect(onComponentMount, []); // Empty array ensures that effect is only run on mount and unmount

    const onComponentUnmount = () => () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
    };
    useEffect(onComponentUnmount, []); // Remove event listeners on cleanup

    return keyPressed.value;
};

export default useKeyPress;
