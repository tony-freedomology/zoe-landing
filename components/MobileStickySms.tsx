"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

// ─────────────────────────────────────────────────────────────────────────────
// iOS SAFARI SCROLL JUDDER FIX (v6):
// position:fixed — always viewport-anchored, no compositor fight.
// IntersectionObserver controls visibility while scroll container is in view.
//
// v8: Four feature beats; final chat fades out + slides up at end of scroll so it clears
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
    variant?: "default" | "emerald-uni"
}) {
    const isUser = sender === "user";
    const opacity = useTransform(scrollYProgress, fadeInRange, [0, 1]);

    return (
        <motion.div
            style={{ opacity }}
            className={clsx(
                "max-w-[85%] px-4 py-3 text-[16px] font-medium leading-[1.4] shadow-sm tracking-tight",
                isUser
                    ? "bg-[#007AFF] text-white self-end rounded-[20px] rounded-br-[4px]"
                    : "bg-[#E9E9EB] text-[#111] self-start rounded-[20px] rounded-bl-[4px]"
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

export default function MobileStickySms({ variant = "default" }: { variant?: "default" | "emerald-uni" } = {}) {
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
    const t1TitleOpacity = useTransform(scrollYProgress, [0.00, 0.06, 0.12, 0.15], [0, 1, 1, 0]);
    const t1TitleBlur = useTransform(scrollYProgress, [0.00, 0.06, 0.12, 0.15], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t1TitleScale = useTransform(scrollYProgress, [0.00, 0.06, 0.12, 0.15], [0.9, 1, 1, 1.05]);
    const t1BodyOpacity = useTransform(scrollYProgress, [0.03, 0.09, 0.12, 0.15], [0, 1, 1, 0]);
    const t1BodyBlur = useTransform(scrollYProgress, [0.03, 0.09, 0.12, 0.15], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 1 CHAT ---
    const c1Opacity = useTransform(scrollYProgress, [0.15, 0.16, 0.405, 0.425], [0, 1, 1, 0]);
    const c1TranslateY = useTransform(scrollYProgress, [0.24, 0.405], [0, -760]);

    // --- PHASE 2 TEXT ---
    const t2TitleOpacity = useTransform(scrollYProgress, [0.425, 0.455, 0.50, 0.525], [0, 1, 1, 0]);
    const t2TitleBlur = useTransform(scrollYProgress, [0.425, 0.455, 0.50, 0.525], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t2TitleScale = useTransform(scrollYProgress, [0.425, 0.455, 0.50, 0.525], [0.9, 1, 1, 1.05]);
    const t2BodyOpacity = useTransform(scrollYProgress, [0.445, 0.47, 0.50, 0.525], [0, 1, 1, 0]);
    const t2BodyBlur = useTransform(scrollYProgress, [0.445, 0.47, 0.50, 0.525], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 2 CHAT ---
    const c2Opacity = useTransform(scrollYProgress, [0.525, 0.535, 0.66, 0.69], [0, 1, 1, 0]);
    const c2TranslateY = useTransform(scrollYProgress, [0.60, 0.69], [0, -260]);

    // --- PHASE 3 TEXT ---
    const t3TitleOpacity = useTransform(scrollYProgress, [0.66, 0.70, 0.735, 0.76], [0, 1, 1, 0]);
    const t3TitleBlur = useTransform(scrollYProgress, [0.66, 0.70, 0.735, 0.76], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t3TitleScale = useTransform(scrollYProgress, [0.66, 0.70, 0.735, 0.76], [0.9, 1, 1, 1.05]);
    const t3BodyOpacity = useTransform(scrollYProgress, [0.70, 0.725, 0.735, 0.76], [0, 1, 1, 0]);
    const t3BodyBlur = useTransform(scrollYProgress, [0.70, 0.725, 0.735, 0.76], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 3 CHAT ---
    const c3Opacity = useTransform(scrollYProgress, [0.745, 0.76, 0.84, 0.855], [0, 1, 1, 0]);
    const c3TranslateY = useTransform(scrollYProgress, [0.745, 0.775, 0.84, 0.855], [120, 0, 0, -80]);

    // --- PHASE 4 TEXT ---
    const t4TitleOpacity = useTransform(scrollYProgress, [0.855, 0.872, 0.882, 0.89], [0, 1, 1, 0]);
    const t4TitleBlur = useTransform(scrollYProgress, [0.855, 0.872, 0.882, 0.89], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
    const t4TitleScale = useTransform(scrollYProgress, [0.855, 0.872, 0.882, 0.89], [0.9, 1, 1, 1.03]);
    const t4BodyOpacity = useTransform(scrollYProgress, [0.865, 0.878, 0.882, 0.89], [0, 1, 1, 0]);
    const t4BodyBlur = useTransform(scrollYProgress, [0.865, 0.878, 0.882, 0.89], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

    // --- PHASE 4 CHAT (scrolls off the top before dawn) ---
    const c4Opacity = useTransform(scrollYProgress, [0.89, 0.891], [0, 1]);
    const c4TranslateY = useTransform(scrollYProgress, [0.965, 1], [0, -620]);

    // Narrative Content Blocks
    const t1 = {
        title: "No App Required.",
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-zoe-muted font-medium tracking-tight mt-6">
                <p><strong className="text-zoe-ink font-semibold">Zoe lives in your texts.</strong> No downloads, no logins, no learning curve.</p>
                <p>Just open your messages — the same place you talk to everyone else.</p>
            </div>
        )
    };

    const t2 = {
        title: <>Daily Journeys<br />Personalized.</>,
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-zoe-muted font-medium tracking-tight mt-6">
                <p>Pick a book, theme, or practice, set your pace, and Zoe delivers a daily reading enriched with original language, cultural context, and reflection prompts.</p>
            </div>
        )
    };

    const t3 = {
        title: "Two Questions.",
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-zoe-muted font-medium tracking-tight mt-6">
                <p><strong className="text-zoe-ink font-semibold">Everything Zoe does points you back to two questions:</strong></p>
                <ul className="list-none space-y-2 text-zoe-ink">
                    <li className="bg-emerald-100/60 text-emerald-900 rounded-lg px-4 py-2 w-full mx-auto inline-block font-semibold">What is God saying to you?</li>
                    <li className="bg-emerald-100/60 text-emerald-900 rounded-lg px-4 py-2 w-full mx-auto inline-block font-semibold">What are you going to do about it?</li>
                </ul>
            </div>
        )
    };

    const t4 = {
        title: "Zoe Remembers.",
        body: (
            <div className="space-y-4 text-[17px] leading-[1.6] text-zoe-muted font-medium tracking-tight mt-6">
                <p>
                    <strong className="text-teal-900 bg-teal-200/60 px-1 py-0.5 rounded-sm font-semibold">Zoe remembers</strong>
                    {' '}what you&apos;re reading, what you&apos;re wrestling with, and what God seems to be doing in your life.
                </p>
            </div>
        )
    };

    return (
        <section ref={containerRef} className="relative w-full h-[1500vh] z-20 block overflow-x-clip bg-zoe-oat">

            {isInView && (
                <div className="fixed top-0 left-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none z-20">

                    {/* ── PHASE 1 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t1TitleOpacity, filter: t1TitleBlur, scale: t1TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-zoe-ink font-bold leading-[1.05]"
                        >
                            {t1.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t1BodyOpacity, filter: t1BodyBlur }}>
                            {t1.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 1 CHAT ── */}
                    <motion.div style={{ opacity: c1Opacity, y: c1TranslateY }} className="absolute top-[8vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="Yesterday, 8:58 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.16, 0.17]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Hey, I'm Zoe 👋 I can help you walk with Jesus in the middle of real life. You know where you wanna start, or want me to take the lead?" scrollYProgress={scrollYProgress} fadeInRange={[0.165, 0.18]} />
                        <ScrollBubble sender="user" variant={variant} text="Awesome. do you think we could do some kind of study on wisdom and decision making? i've got some pretty big work/family stuff in front of me" scrollYProgress={scrollYProgress} fadeInRange={[0.18, 0.195]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Yeah sure thing! I can put together a couple of weeks on wisdom - Proverbs, James, Ecclesiastes, and a little Luke. Wanna start tomorrow morning? What time?" scrollYProgress={scrollYProgress} fadeInRange={[0.195, 0.215]} />
                        <ScrollBubble sender="user" variant={variant} text="7am" scrollYProgress={scrollYProgress} fadeInRange={[0.215, 0.23]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Sweet, I'll hit you up in the morning 🙂" scrollYProgress={scrollYProgress} fadeInRange={[0.23, 0.24]} />
                    </motion.div>

                    {/* ── PHASE 2 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t2TitleOpacity, filter: t2TitleBlur, scale: t2TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-zoe-ink font-bold leading-[1.05]"
                        >
                            {t2.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t2BodyOpacity, filter: t2BodyBlur }}>
                            {t2.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 2 CHAT ── */}
                    <motion.div style={{ opacity: c2Opacity, y: c2TranslateY }} className="absolute top-[8vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="Today, 7:01 AM" scrollYProgress={scrollYProgress} fadeInRange={[0.445, 0.455]} />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text="morning Tony! You ready for Day 1 on Wisdom and decision making? We're starting in Proverbs."
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.455, 0.475]}
                        />
                        <ScrollBubble sender="user" variant={variant} text="Yeah let's do it" scrollYProgress={scrollYProgress} fadeInRange={[0.485, 0.505]} />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text={
                                <div className="space-y-2">
                                    <p>Nice okay!😄</p>
                                    <p>
                                        PROVERBS 3:5-6
                                        <br />
                                        &quot;Trust in the Lord with all of your heart and lean not on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.&quot;
                                    </p>
                                </div>
                            }
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.515, 0.545]}
                        />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text="This was originally written for a young person in a society where being self sufficient was the ultimate value. To trust, instead of leaning on your own understanding was countercultural. It was an act of surrender."
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.545, 0.575]}
                        />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text={'Notice that the word "all" appears twice. ALL your heart. ALL your ways. Not just in crisis or at big decision points, but at every point along the way. It\'s a daily posture - an orientation toward God, even in the small things.'}
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.575, 0.605]}
                        />
                    </motion.div>

                    {/* ── PHASE 3 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t3TitleOpacity, filter: t3TitleBlur, scale: t3TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-zoe-ink font-bold leading-[1.05]"
                        >
                            {t3.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t3BodyOpacity, filter: t3BodyBlur }}>
                            {t3.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 3 CHAT ── */}
                    <motion.div style={{ opacity: c3Opacity, y: c3TranslateY }} className="absolute top-[16vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="Today, 7:04 AM" scrollYProgress={scrollYProgress} fadeInRange={[0.755, 0.765]} />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text="Also notice there's no promise that He'll explain the path. Or tell you where it goes ahead of time. Just take the next step, and he'll make it straight. Trust is part of the deal."
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.76, 0.772]}
                        />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text="For you, the career thing isn't just one big decision. It's a hundred small daily ones - conversations with Greg, the way you spend your creative energy, how you show up for your family. Which of those smaller calls do you tend to handle entirely on your own without checking in with God?🤔"
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.775, 0.787]}
                        />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text="For prayer today, bring one specific decision you're carrying right now, and tell God you don't fully understand it, but you trust Him to make the path straight, even if it's not clear."
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.79, 0.802]}
                        />
                        <ScrollBubble
                            sender="user"
                            variant={variant}
                            text="Yeah that's good. I'm praying that God will help me say what I need to in this meeting today."
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.807, 0.819]}
                        />
                        <ScrollBubble
                            sender="zoe"
                            variant={variant}
                            text="He will"
                            scrollYProgress={scrollYProgress}
                            fadeInRange={[0.824, 0.834]}
                        />
                    </motion.div>

                    {/* ── PHASE 4 TEXT ── */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-[400px] mx-auto">
                        <motion.h2
                            style={{ opacity: t4TitleOpacity, filter: t4TitleBlur, scale: t4TitleScale }}
                            className="text-[42px] tracking-tighter-editorial-relaxed text-zoe-ink font-bold leading-[1.05]"
                        >
                            {t4.title}
                        </motion.h2>
                        <motion.div style={{ opacity: t4BodyOpacity, filter: t4BodyBlur }}>
                            {t4.body}
                        </motion.div>
                    </div>

                    {/* ── PHASE 4 CHAT (scrolls off the top before dawn) ── */}
                    <motion.div style={{ opacity: c4Opacity, y: c4TranslateY }} className="absolute top-[8vh] left-0 w-full px-4 flex flex-col gap-[6px] z-20 pointer-events-auto">
                        <ScrollTimestamp text="12:18 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.89, 0.90]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Hey just a reminder that acknowledging Him in all your ways includes that meeting you're walking into this afternoon. Deep breaths. Open hands. He's with you." scrollYProgress={scrollYProgress} fadeInRange={[0.895, 0.91]} />

                        <ScrollTimestamp text="8:58 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.91, 0.92]} />
                        <ScrollBubble sender="zoe" variant={variant} text="rq before you crash - do you feel like you were able to practice trust anywhere today?" scrollYProgress={scrollYProgress} fadeInRange={[0.92, 0.935]} />
                        <ScrollBubble sender="user" variant={variant} text="honestly, in the meeting. i wanted to push for certainty, but i held it more loosely." scrollYProgress={scrollYProgress} fadeInRange={[0.94, 0.955]} />
                        <ScrollBubble sender="zoe" variant={variant} text="Nice! 😁 Proverbs 3 made it into the meeting! Glad you noticed God inviting you to give Him control! Grab some sleep - we're in Ecclesiastes 3 tomorrow." scrollYProgress={scrollYProgress} fadeInRange={[0.955, 0.965]} />
                    </motion.div>

                </div>
            )}

            {/* Seamless Gradient blending into the next section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none z-10"
                style={{
                    background: "linear-gradient(to bottom, #FCF9F4 0%, #fecdd3 100%)"
                }}
            />
            <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-rose-200 pointer-events-none z-10" />
        </section>
    );
}

