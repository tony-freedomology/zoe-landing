"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

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
    // Bubble fades in and slides up seamlessly precisely as the user scrubs through its designated scroll range
    const opacity = useTransform(scrollYProgress, fadeInRange, [0, 1]);
    const y = useTransform(scrollYProgress, fadeInRange, [30, 0]);

    return (
        <motion.div
            style={{ opacity, y }}
            className={clsx(
                "max-w-[80%] md:max-w-[85%] px-4 py-3 text-[15px] font-medium leading-[1.4] shadow-sm tracking-tight",
                isUser
                    ? clsx("bg-[#007AFF] text-white self-end", variant === "jesus-red" ? "rounded-md" : "rounded-[18px] rounded-br-[4px]")
                    : clsx("bg-[#E9E9EB] text-[#111] self-start", variant === "jesus-red" ? "rounded-md" : "rounded-[18px] rounded-bl-[4px]")
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
            className="text-[11px] font-medium text-slate-500 text-center mt-6 mb-2"
        >
            {text}
        </motion.div>
    );
}

export default function DesktopStickySms({ variant = "default" }: { variant?: "default" | "jesus-red" | "emerald-uni" } = {}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // ─────────────────────────────────────────────────────────────────
    // 650vh MASTER TIMELINE:
    // Scroll distance is extended to make transitions 1:1 with natural swipe speed.
    // ─────────────────────────────────────────────────────────────────

    const mainY = useTransform(
        scrollYProgress,
        [0, 0.12, 0.30, 0.50, 0.64, 0.78, 0.88, 1],
        ["0%", "0%", "-25%", "-25%", "-50%", "-50%", "-75%", "-75%"]
    );
    const phase2ThreadExitY = useTransform(
        scrollYProgress,
        [0.50, 0.57, 0.64],
        [0, -12, -36]
    );

    // Fade Opacities & Transforms for the Desktop-Only Side Narrative Text
    const step1TitleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.16, 0.24], [1, 1, 1, 0]);
    const step1TitleY = useTransform(scrollYProgress, [0, 0.05, 0.16, 0.24], [0, 0, 0, -50]);
    const step1BodyOpacity = useTransform(scrollYProgress, [0.10, 0.13, 0.16, 0.24], [0, 1, 1, 0]);
    const step1BodyY = useTransform(scrollYProgress, [0.10, 0.13, 0.16, 0.24], [15, 0, 0, -50]);

    const step2TitleOpacity = useTransform(scrollYProgress, [0.22, 0.30, 0.48, 0.56], [0, 1, 1, 0]);
    const step2TitleY = useTransform(scrollYProgress, [0.22, 0.30, 0.48, 0.56], [50, 0, 0, -50]);
    const step2BodyOpacity = useTransform(scrollYProgress, [0.34, 0.38, 0.48, 0.56], [0, 1, 1, 0]);
    const step2BodyY = useTransform(scrollYProgress, [0.34, 0.38, 0.48, 0.56], [15, 0, 0, -50]);

    const step3TitleOpacity = useTransform(scrollYProgress, [0.60, 0.66, 0.78, 0.84], [0, 1, 1, 0]);
    const step3TitleY = useTransform(scrollYProgress, [0.60, 0.66, 0.78, 0.84], [50, 0, 0, -50]);
    const step3BodyOpacity = useTransform(scrollYProgress, [0.69, 0.73, 0.78, 0.84], [0, 1, 1, 0]);
    const step3BodyY = useTransform(scrollYProgress, [0.69, 0.73, 0.78, 0.84], [15, 0, 0, -50]);

    const step4TitleOpacity = useTransform(scrollYProgress, [0.78, 0.88, 0.98, 1], [0, 1, 1, 1]);
    const step4TitleY = useTransform(scrollYProgress, [0.78, 0.88, 0.98, 1], [50, 0, 0, 0]);
    const step4BodyOpacity = useTransform(scrollYProgress, [0.90, 0.94, 0.98, 1], [0, 1, 1, 1]);
    const step4BodyY = useTransform(scrollYProgress, [0.90, 0.94, 0.98, 1], [15, 0, 0, 0]);

    // Narrative Content with formatting added to visually break up the text blocks
    const t1 = {
        title: "No App Required.",
        body: (
            <div className="space-y-4 text-[16px] md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-zoe-muted font-medium tracking-tight">
                <p><strong className="text-zoe-ink font-semibold">Zoe lives in your texts.</strong> No downloads, no logins, no learning curve.</p>
                <p>Just open your messages — the same place you talk to everyone else.</p>
            </div>
        )
    };

    const t2 = {
        title: <>Daily Journeys<br />Personalized.</>,
        body: (
            <div className="space-y-4 text-[16px] md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-zoe-muted font-medium tracking-tight">
                <p>Pick a book, theme, or practice, set your pace, and Zoe delivers a daily reading enriched with original language, cultural context, and reflection prompts.</p>
                <p>Not a generic devotional, but a <strong className="text-zoe-ink font-semibold">guided study built around you.</strong></p>
            </div>
        )
    };

    const t3 = {
        title: "Two Questions.",
        body: (
            <div className="space-y-4 text-[16px] md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-zoe-muted font-medium tracking-tight">
                <p><strong className="text-zoe-ink font-semibold">Everything Zoe does points you back to two questions:</strong></p>
                <ul className="list-none space-y-2 text-zoe-ink block md:-translate-y-1 md:my-0">
                    <li className="bg-emerald-100/60 text-emerald-900 rounded-lg px-4 py-1.5 w-fit font-semibold">What is God saying to you?</li>
                    <li className="bg-emerald-100/60 text-emerald-900 rounded-lg px-4 py-1.5 w-fit font-semibold">What are you going to do about it?</li>
                </ul>
            </div>
        )
    };

    const t4 = {
        title: "Zoe Remembers.",
        body: (
            <div className="space-y-4 text-[16px] md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-zoe-muted font-medium tracking-tight">
                <p>
                    <strong className="text-teal-900 bg-teal-200/60 px-1 py-0.5 rounded-sm font-semibold">Zoe remembers</strong>
                    {' '}what you're reading, what you're wrestling with, and what God seems to be doing in your life.
                </p>
            </div>
        )
    };

    return (
        <section ref={containerRef} className={clsx("relative w-full h-[650vh] z-20 block", variant === "jesus-red" ? "bg-[#f5efe6]" : "bg-zoe-oat")}>

            {/* Sticky Container locks viewport to coordinate cinematic scroll physics for BOTH Desktop and Mobile */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-20 px-0 md:px-4">

                {/* DESKTOP NARRATIVE COPY (Left & Right of iPhone) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10 font-sans">
                    <div className="relative max-w-[1400px] mx-auto h-full w-full">

                        {/* PHASE 1 */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-auto">
                            {/* Left Side Title */}
                            <motion.div style={{ opacity: step1TitleOpacity, y: step1TitleY }} className="w-[50%] pr-[230px] lg:pr-[260px] flex justify-end">
                                <h2 className="text-4xl lg:text-6xl xl:text-7xl tracking-tighter-editorial-relaxed text-right text-zoe-ink font-bold leading-[1.05] drop-shadow-sm max-w-[450px]">
                                    {t1.title}
                                </h2>
                            </motion.div>
                            {/* Right Side Body */}
                            <motion.div style={{ opacity: step1BodyOpacity, y: step1BodyY }} className="w-[50%] pl-[230px] lg:pl-[260px] flex justify-start">
                                <div className="max-w-[480px]">
                                    {t1.body}
                                </div>
                            </motion.div>
                        </div>

                        {/* PHASE 2 */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-auto">
                            <motion.div style={{ opacity: step2TitleOpacity, y: step2TitleY }} className="w-[50%] pr-[230px] lg:pr-[260px] flex justify-end">
                                <h2 className="text-4xl lg:text-6xl xl:text-7xl tracking-tighter-editorial-relaxed text-right text-zoe-ink font-bold leading-[1.05] drop-shadow-sm max-w-[450px]">
                                    {t2.title}
                                </h2>
                            </motion.div>
                            <motion.div style={{ opacity: step2BodyOpacity, y: step2BodyY }} className="w-[50%] pl-[230px] lg:pl-[260px] flex justify-start">
                                <div className="max-w-[480px]">
                                    {t2.body}
                                </div>
                            </motion.div>
                        </div>

                        {/* PHASE 3 */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-auto">
                            <motion.div style={{ opacity: step3TitleOpacity, y: step3TitleY }} className="w-[50%] pr-[230px] lg:pr-[260px] flex justify-end">
                                <h2 className="text-4xl lg:text-6xl xl:text-7xl tracking-tighter-editorial-relaxed text-right text-zoe-ink font-bold leading-[1.05] drop-shadow-sm max-w-[480px]">
                                    {t3.title}
                                </h2>
                            </motion.div>
                            <motion.div style={{ opacity: step3BodyOpacity, y: step3BodyY }} className="w-[50%] pl-[230px] lg:pl-[260px] flex justify-start">
                                <div className="max-w-[480px]">
                                    {t3.body}
                                </div>
                            </motion.div>
                        </div>

                        {/* PHASE 4 */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-auto">
                            <motion.div style={{ opacity: step4TitleOpacity, y: step4TitleY }} className="w-[50%] pr-[230px] lg:pr-[260px] flex justify-end">
                                <h2 className="text-4xl lg:text-6xl xl:text-7xl tracking-tighter-editorial-relaxed text-right text-zoe-ink font-bold leading-[1.05] drop-shadow-sm max-w-[480px]">
                                    {t4.title}
                                </h2>
                            </motion.div>
                            <motion.div style={{ opacity: step4BodyOpacity, y: step4BodyY }} className="w-[50%] pl-[230px] lg:pl-[260px] flex justify-start">
                                <div className="max-w-[480px]">
                                    {t4.body}
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>

                {/* Simulated iPhone Device Frame on Desktop, Full Bleed on Mobile */}
                <div className={clsx("relative w-full h-full md:w-[400px] md:h-[80vh] md:max-h-[850px] border-zoe-ink md:shadow-2xl overflow-hidden shrink-0 pointer-events-auto z-20",
                    variant === "jesus-red" ? "bg-[#faf7f0] md:rounded-[32px] md:border-[10px]" : "bg-white md:rounded-[48px] md:border-[12px]")}>

                    {/* CONTINUOUS CHAT THREAD (Grouped into 4 fixed 1/4 height "Pages") */}
                    <motion.div
                        style={{ y: mainY }}
                        className="absolute top-0 inset-x-0 mx-auto w-full h-[400%] flex flex-col z-10 pointer-events-none"
                    >
                        {/* --- PAGE 1 --- */}
                        <div className="h-1/4 w-full flex flex-col justify-end pb-[4vh] md:pb-[8%] relative px-4 pointer-events-auto">
                            <div className="absolute top-[8vh] md:top-[10%] left-0 w-full px-4 flex flex-col gap-[6px]">
                                <ScrollTimestamp text="Yesterday, 8:58 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.01, 0.03]} />
                                <ScrollBubble sender="zoe" variant={variant} text="Hey, I'm Zoe 👋 I can help you walk with Jesus in the middle of real life. You know where you wanna start, or want me to take the lead?" scrollYProgress={scrollYProgress} fadeInRange={[0.02, 0.04]} />
                                <ScrollBubble sender="user" variant={variant} text="Awesome. do you think we could do some kind of study on wisdom and decision making? i've got some pretty big work/family stuff in front of me" scrollYProgress={scrollYProgress} fadeInRange={[0.04, 0.06]} />
                                <ScrollBubble sender="zoe" variant={variant} text="Yeah sure thing! I can put together a couple of weeks on wisdom - Proverbs, James, Ecclesiastes, and a little Luke. Wanna start tomorrow morning? What time?" scrollYProgress={scrollYProgress} fadeInRange={[0.06, 0.085]} />
                                <ScrollBubble sender="user" variant={variant} text="7am" scrollYProgress={scrollYProgress} fadeInRange={[0.085, 0.105]} />
                                <ScrollBubble sender="zoe" variant={variant} text="Sweet, I'll hit you up in the morning 🙂" scrollYProgress={scrollYProgress} fadeInRange={[0.105, 0.12]} />
                            </div>
                        </div>

                        {/* --- PAGE 2 --- */}
                        <div className="h-1/4 w-full flex flex-col justify-end pb-[8%] relative px-4 pointer-events-auto">
                            {/* Text Messages Wrapper shifted up to reclaim white space */}
                            <motion.div
                                style={{ y: phase2ThreadExitY }}
                                className="absolute top-[-2%] left-0 w-full px-4 flex flex-col gap-[6px]"
                            >
                                <ScrollTimestamp text="Today, 7:01 AM" scrollYProgress={scrollYProgress} fadeInRange={[0.35, 0.38]} />
                                <ScrollBubble
                                    sender="zoe"
                                    variant={variant}
                                    text="morning Tony! You ready for Day 1 on Wisdom and decision making? We're starting in Proverbs."
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.34, 0.37]}
                                />
                                <ScrollBubble sender="user" variant={variant} text="Yeah let's do it" scrollYProgress={scrollYProgress} fadeInRange={[0.38, 0.40]} />
                                <ScrollBubble
                                    sender="zoe"
                                    variant={variant}
                                    text={
                                        <div className="space-y-2 text-[13px] leading-[1.35] tracking-tight">
                                            <p>Nice okay!😄</p>
                                            <p>
                                                PROVERBS 3:5-6
                                                <br />
                                                &quot;Trust in the Lord with all of your heart and lean not on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.&quot;
                                            </p>
                                            <p>This was originally written for a young person in a society where being self sufficient was the ultimate value. To trust, instead of leaning on your own understanding was countercultural. It was an act of surrender.</p>
                                            <p>Notice that the word &quot;all&quot; appears twice. ALL your heart. ALL your ways. Not just in crisis or at big decision points, but at every point along the way. It&apos;s a daily posture - an orientation toward God, even in the small things.</p>
                                        </div>
                                    }
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.42, 0.49]}
                                />
                            </motion.div>
                        </div>

                        {/* --- PAGE 3 --- */}
                        <div className="h-1/4 w-full flex flex-col justify-end pb-[8%] relative px-4 pointer-events-auto">
                            <motion.div className="absolute top-[8%] left-0 w-full px-4 flex flex-col gap-[6px]">
                                <ScrollBubble
                                    sender="zoe"
                                    variant={variant}
                                    text="Also notice there's no promise that He'll explain the path. Or tell you where it goes ahead of time. Just take the next step, and he'll make it straight. Trust is part of the deal."
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.56, 0.585]}
                                />
                                <ScrollBubble
                                    sender="zoe"
                                    variant={variant}
                                    text="For you, the career thing isn't just one big decision. It's a hundred small daily ones - conversations with Greg, the way you spend your creative energy, how you show up for your family. Which of those smaller calls do you tend to handle entirely on your own without checking in with God?🤔"
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.59, 0.615]}
                                />
                                <ScrollBubble
                                    sender="zoe"
                                    variant={variant}
                                    text="For prayer today, bring one specific decision you're carrying right now, and tell God you don't fully understand it, but you trust Him to make the path straight, even if it's not clear."
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.62, 0.645]}
                                />
                                <ScrollBubble
                                    sender="user"
                                    variant={variant}
                                    text="Yeah that's good. I'm praying that God will help me say what I need to in this meeting today."
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.65, 0.67]}
                                />
                                <ScrollBubble
                                    sender="zoe"
                                    variant={variant}
                                    text="He will"
                                    scrollYProgress={scrollYProgress}
                                    fadeInRange={[0.675, 0.69]}
                                />
                            </motion.div>
                        </div>

                        {/* --- PAGE 4 --- */}
                        <div className="h-1/4 w-full flex flex-col justify-end pb-[8%] relative px-4 pointer-events-auto">
                            <motion.div className="absolute top-[-2%] left-0 w-full px-4 flex flex-col gap-[6px]">
                                <ScrollTimestamp text="12:18 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.89, 0.90]} />
                                <ScrollBubble sender="zoe" variant={variant} text="Hey just a reminder that acknowledging Him in all your ways includes that meeting you're walking into this afternoon. Deep breaths. Open hands. He's with you." scrollYProgress={scrollYProgress} fadeInRange={[0.90, 0.92]} />

                                <ScrollTimestamp text="8:58 PM" scrollYProgress={scrollYProgress} fadeInRange={[0.93, 0.94]} />
                                <ScrollBubble sender="zoe" variant={variant} text="rq before you crash - do you feel like you were able to practice trust anywhere today?" scrollYProgress={scrollYProgress} fadeInRange={[0.94, 0.95]} />
                                <ScrollBubble sender="user" variant={variant} text="honestly, in the meeting. i wanted to push for certainty, but i held it more loosely." scrollYProgress={scrollYProgress} fadeInRange={[0.95, 0.97]} />
                                <ScrollBubble sender="zoe" variant={variant} text="Nice! 😁 Proverbs 3 made it into the meeting! Glad you noticed God inviting you to give Him control! Grab some sleep - we're in Ecclesiastes 3 tomorrow." scrollYProgress={scrollYProgress} fadeInRange={[0.97, 0.99]} />
                            </motion.div>
                        </div>

                    </motion.div>
                </div>

            </div>

            {/* Seamless Gradient blending into the next section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-10"
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
