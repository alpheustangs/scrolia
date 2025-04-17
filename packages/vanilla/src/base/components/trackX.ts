import { effect } from "@preact/signals-core";
import type { Core } from "#/@types/core";
import type { CreateComponent } from "#/@types/html";

type CreateTrackXOptions = {
    core: Core;
};

type CreateTrackX = CreateComponent;

const createTrackX = (options: CreateTrackXOptions): CreateTrackX => {
    const {
        options: { disabled, headless, page },
        x,
    } = options.core;

    const attach = (el: HTMLElement): (() => void) => {
        let cleanups: (() => void)[] = [];

        if (disabled) return () => void 0;

        x.hvTrack.value = true;

        if (!headless) {
            el.classList.add("sla-track", "sla-x");
            !page && el.classList.add("sla-child");
        }

        cleanups.push((): void => {
            if (!headless) {
                el.classList.remove("sla-track", "sla-x");
                !page && el.classList.remove("sla-child");
            }
        });

        // for headless customization
        const cleanupClassEffect = effect((): void => {
            const {
                options: { activeTrackClassName },
            } = x;

            if (!headless || activeTrackClassName === false) return void 0;

            if (x.isActive.value) {
                el.classList.add(activeTrackClassName);
            } else {
                el.classList.remove(activeTrackClassName);
            }
        });

        cleanups.push(cleanupClassEffect);

        return (): void => {
            for (const cleanup of cleanups) cleanup();
            cleanups = [];
        };
    };

    return {
        attach,
    };
};

export type { CreateTrackXOptions, CreateTrackX };
export { createTrackX };
