"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

// ─────────────────────────────────────────────────────────────────────────────
// iOS SAFARI SCROLL JUDDER FIX (v6):
// position:fixed — always viewport-anchored, no compositor fight.
// IntersectionObserver controls visibility while scroll container is in view.
//
// v7: Phase 3 chat now fades out + slides up at end of scroll so it clears
// before the dawn/rhythms section takes over.
// ─────────────────────────────────────────────────────────────────────────────

function ScrollBubble({
    sender,
    text,
    scrollYProgress,
    fadeInRange,
    variant
}: {
    sender: "user" | "zoe",
    text: React.ReactNode,
    scrollYProgress: MotionValue<number>,
    fadeInRange: [number, number],
    variant?: "default" | "jesus-red" | "emerald-uni"
}) {
    const isUser = sender === "user";
    const opacity = useTransform(scrollYProgress, fadeInRange, [0, 1]);

    return (
        <motion.div
            style={{ opacity }}
            className={clsx(
                "max-w-[85%] px-4 py-3 text-[16px] font-medium leading-[1.4] shadow-sm tracking-tight",
                isUser
                    ? clsx("bg-[#007AFF] text-white self-end", variant === "jesus-red" ? "rounded-md" : "rounded-[20px] rounded-br-[4px]")
                    : clsx("bg-[#E9E9EB] text-[#111] self-start", variant === "jesus-red" ? "rounded-md" : "rounded-[20px] rounded-bl-[4px]")
            )}
        >
            {text}
        </motion.div>
    );
}

function ScrollTimestamp({
    text,
    scrollYProgress,
    fadeInRange
}: {
    text: string,
    scrollYProgress: MotionValue<number>,
    fadeInRange: [number, number]
}) {
    const opacity = useTransform(scrollYProgress, fadeInRange, [0, 1]);
    return (
        <motion.div
            style={{ opacity }}
            className="text-[12px] font-medium text-slate-500 text-center mt-6 mb-2"
        >
            {text}
        </motion.div>
    );
}

export default function MobileStickySms({ variant = "default" }: { variant?: "default" | "jesus-red" | "emerald-uni" } = {}) {
    const containerRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // --- PHASE 1 TEXT ---
    const t1TitleOpacity = useTransform(scrollYProgress, [0.00, 0.08, 0.16, 0.20], [0, 1, 1, 0]);
    const t1TitleBlur = useTransform(scrollYProgress, [0.00, 0.08, 0.16, 0.20], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t1TitleScale = useTransform(scrollYProgress, [0.00, 0.08, 0.16, 0.20], [0.9, 1, 1, 1.05]);
    const t1BodyOpacity = useTransform(scrollYProgress, [0.04, 0.12, 0.16, 0.20], [0, 1, 1, 0]);
    const t1BodyBlur = useTransform(scrollYProgress, [0.04, 0.12, 0.16, 0.20], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 1 CHAT ---
    const c1Opacity = useTransform(scrollYProgress, [0.20, 0.21, 0.30, 0.33], [0, 1, 1, 0]);

    // --- PHASE 2 TEXT ---
    const t2TitleOpacity = useTransform(scrollYProgress, [0.34, 0.40, 0.48, 0.52], [0, 1, 1, 0]);
    const t2TitleBlur = useTransform(scrollYProgress, [0.34, 0.40, 0.48, 0.52], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t2TitleScale = useTransform(scrollYProgress, [0.34, 0.40, 0.48, 0.52], [0.9, 1, 1, 1.05]);
    const t2BodyOpacity = useTransform(scrollYProgress, [0.38, 0.44, 0.48, 0.52], [0, 1, 1, 0]);
    const t2BodyBlur = useTransform(scrollYProgress, [0.38, 0.44, 0.48, 0.52], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 2 CHAT ---
    const c2Opacity = useTransform(scrollYProgress, [0.52, 0.53, 0.63, 0.66], [0, 1, 1, 0]);

    // --- PHASE 3 TEXT ---
    const t3TitleOpacity = useTransform(scrollYProgress, [0.67, 0.73, 0.78, 0.82], [0, 1, 1, 0]);
    const t3TitleBlur = useTransform(scrollYProgress, [0.67, 0.73, 0.78, 0.82], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t3TitleScale = useTransform(scrollYProgress, [0.67, 0.73, 0.78, 0.82], [0.9, 1, 1, 1.05]);
    const t3BodyOpacity = useTransform(scrollYProgress, [0.71, 0.77, 0.78, 0.82], [0, 1, 1, 0]);
    const t3BodyBlur = useTransform(scrollYProgress, [0.71, 0.77, 0.78, 0.82], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 3 CHAT (compressed timing: fade in 0.82-0.92, then fade out + slide up 0.93-1.0) ---
    const c3Opacity = useTransform(scrollYProgress, [0.82, 0.83, 0.92, 0.97], [0, 1, 1, 0]);
    const c3TranslateY = useTransform(scrollYProgress, [0.92, 0.97], [0, -120]);

    // Narrative Content Blocks
    const t1 = {
        title: "No App Required.",
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-slate-600 font-medium tracking-tight mt-6">
                <p><strong className="text-slate-900 font-semibold">Zoe lives in your texts.</strong> No downloads, no logins, no learning curve.</p>
                <p>Just open your messages — the same place you talk to everyone else.</p>
            </div>
        )
    };

    const t2 = {
        title: "Two Questions.",
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-slate-600 font-medium tracking-tight mt-6">
                <p><strong className="text-slate-900 font-semibold">Everything Zoe does points you back to two questions:</strong></p>
                <ul className="list-none space-y-2 text-slate-800">
                    <li className="bg-emerald-100/60 text-emerald-900 rounded-lg px-4 py-2 w-full mx-auto inline-block font-semibold">What is God saying to you?</li>
                    <li className="bg-emerald-100/60 text-emerald-900 rounded-lg px-4 py-2 w-full mx-auto inline-block font-semibold">What are you going to do about it?</li>
                </ul>
                <p>Pick a book, set your pace, and Zoe delivers a daily reading enriched with original language, cultural context, and reflection prompts.</p>
            </div>
        )
    };

    const t3 = {
        title: "Zoe Remembers.",
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-slate-600 font-medium tracking-tight mt-6">
                <p>
                    <strong className="text-teal-900 bg-teal-200/60 px-1 py-0.5 rounded-sm font-semibold">Zoe remembers</strong>
                    {' '}what you&apos;re reading, what you&apos;re wrestling with, and what God seems to be doing in your life.
                </p>
                <p>Every conversation picks up where the last one left off — because transformation happens when someone helps you connect the dots across days, not just moments.</p>
            </div>
        )
    };

    return (
        <section ref={containerRef} className={clsx("relative w-full h-[1200vh] z-20 block overflow-x-clip", variant === "jesus-red" ? "bg-[#f5efe6]" : "bg-zoe-oat")}>

            {isInView && (
                <div className="fixed top-0 left-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none z-20">

                    {/* ── PHASE 1 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t1TitleOpacity, filter: t1TitleBlur, scale: t1TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-slate-900 font-bold leading-[1.05]"
                        >
                            {t1.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t1BodyOpacity, filter: t1BodyBlur }}>
                            {t1.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 1 CHAT ── */}
                    <motion.div style={{ opacity: c1Opacity }} className="absolute top-[8vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="Yesterday, 8:58 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.20, 0.21]} />
                        <ScrollBubble sender="user" variant={variant} text="can we do a study on wisdom and decision-making? i've got some big work/family stuff in front of me and i don't want to just spiral about it" scrollYProgress={scrollYProgress} fadeInRange={[0.205, 0.225]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Yeah sure thing! I can put together a couple of weeks on wisdom - Proverbs, James, Ecclesiastes, and a little Luke. Wanna start tomorrow morning? What time?" scrollYProgress={scrollYProgress} fadeInRange={[0.225, 0.245]} />
                        <ScrollBubble sender="user" variant={variant} text="7am" scrollYProgress={scrollYProgress} fadeInRange={[0.245, 0.26]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Sweet, I'll hit you up in the morning 🙂" scrollYProgress={scrollYProgress} fadeInRange={[0.26, 0.28]} />
                    </motion.div>

                    {/* ── PHASE 2 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t2TitleOpacity, filter: t2TitleBlur, scale: t2TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-slate-900 font-bold leading-[1.05]"
                        >
                            {t2.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t2BodyOpacity, filter: t2BodyBlur }}>
                            {t2.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 2 CHAT ── */}
                    <motion.div style={{ opacity: c2Opacity }} className="absolute top-[8vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="Today, 7:01 AM" scrollYProgress={scrollYProgress} fadeInRange={[0.52, 0.53]} />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text={
                                <>
                                    morning - day 1 of wisdom and decision-making.
                                    <br />
                                    <br />
                                    PROVERBS 3:5-6
                                    <br />
                                    &quot;Trust in the Lord with all your heart...&quot;
                                    <br />
                                    <br />
                                    The line that matters today is all your ways. That includes the big crossroads and the smaller calls you make while you&apos;re moving.
                                    <br />
                                    <br />
                                    Proverbs treats wisdom as a posture: trust, acknowledge, keep moving. You may still want the full map. God may only give the next faithful step.
                                    <br />
                                    <br />
                                    What&apos;s one decision today you&apos;re tempted to handle on your own?
                                </>
                            }
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.54, 0.56]}
                        />
                        <ScrollBubble sender="user" variant={variant} text="the work stuff. i keep wanting the whole plan before i take the next step." scrollYProgress={scrollYProgress} fadeInRange={[0.57, 0.59]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Yeah. That's the real tension. You can take the next faithful step without seeing the whole map yet. Stay close enough to God to obey what's actually in front of you." scrollYProgress={scrollYProgress} fadeInRange={[0.60, 0.63]} />
                    </motion.div>

                    {/* ── PHASE 3 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t3TitleOpacity, filter: t3TitleBlur, scale: t3TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-slate-900 font-bold leading-[1.05]"
                        >
                            {t3.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t3BodyOpacity, filter: t3BodyBlur }}>
                            {t3.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 3 CHAT (fades in, then slides up + fades out before dawn) ── */}
                    <motion.div style={{ opacity: c3Opacity, y: c3TranslateY }} className="absolute top-[8vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="12:18 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.83, 0.84]} />
                        <ScrollBubble sender="zoe" variant={variant} text={'Just a reminder that acknowledging Him in "all your ways" includes whatever you\'re walking into this afternoon.'} scrollYProgress={scrollYProgress} fadeInRange={[0.84, 0.86]} />

                        <ScrollTimestamp text="8:58 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.86, 0.87]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Before you crash: where did you feel tempted today to force clarity instead of staying close to Him?" scrollYProgress={scrollYProgress} fadeInRange={[0.87, 0.88]} />
                        <ScrollBubble sender="user" variant={variant} text="honestly, in the meeting. i wanted to push for certainty, but i held it more loosely." scrollYProgress={scrollYProgress} fadeInRange={[0.88, 0.90]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Nice! 😁 Proverbs 3 made it into the meeting! Glad you noticed God inviting you to give Him control!" scrollYProgress={scrollYProgress} fadeInRange={[0.90, 0.92]} />
                    </motion.div>

                </div>
            )}

            {/* Seamless Gradient blending into the next section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none z-10"
                style={{
                    background: variant === "jesus-red"
                        ? "linear-gradient(to bottom, #f5efe6 0%, #fecdd3 100%)"
                        : "linear-gradient(to bottom, #FCF9F4 0%, #fecdd3 100%)"
                }}
            />
            <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-rose-200 pointer-events-none z-10" />
        </section>
    );
}
