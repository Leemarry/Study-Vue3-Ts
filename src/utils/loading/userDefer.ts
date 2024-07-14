
import { onUnmounted, ref } from 'vue';
export function useDefer(maxCount: number =300) {
    const count = ref(0);
    let requestId: number | null = null;  
    // let requestId  = null;  
    const updateFrame = () => {
        count.value++;
        if (count.value >= maxCount) {
            return;
        }
     requestId =    window.requestAnimationFrame(updateFrame);
    }

    updateFrame();
    onUnmounted(() => {
        console.log('onU');
        window.cancelAnimationFrame(requestId as number);
        requestId = null;
    })

    return (n: number) => {
        
        return count.value >= n;

    }
}