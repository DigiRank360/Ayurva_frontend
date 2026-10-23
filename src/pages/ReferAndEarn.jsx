import { ArrowRight, CheckCircle2, CircleHelp, ClipboardCheck, Info, Link2, UserRoundPlus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import useSeo from '@/hooks/useSeo';
import PageHero from '@/components/ui/PageHero';
import { getMlmPortalUrl } from '@/lib/mlmPortal';
import referEarnHero from '@/assets/refer-earn-hero.png';
import referEarnImage from '@/assets/refer-earn.png';

const steps = [
    {
        icon: UserRoundPlus,
        title: 'Join & Register',
        description: 'Create a member account through the dedicated AyuvaPro Member Portal and complete the requested onboarding steps.',
    },
    {
        icon: Link2,
        title: 'Share Your Referral Link',
        description: 'After signing in, find your referral link in Marketing Tools and share product information responsibly.',
    },
    {
        icon: ClipboardCheck,
        title: 'Referral Review',
        description: 'Referral activity and any eligible rewards are handled only under published programme terms and applicable verification.',
    },
];

const programmeDetails = [
    {
        title: 'Eligibility & onboarding',
        description: 'Registration, identity checks and any eligibility requirements are subject to the current approved programme terms.',
    },
    {
        title: 'Referral tracking',
        description: 'Use the personal referral link made available in the member portal. Tracking and qualifying actions must follow the published rules.',
    },
    {
        title: 'Rewards & payments',
        description: 'Reward amounts, qualification rules, cancellations, limits, taxes and payment timing will be shared in the official terms when approved.',
    },
    {
        title: 'Responsible sharing',
        description: 'Share accurate product information. Do not make medical, guaranteed-results or unapproved income claims, or send spam.',
    },
];

export default function ReferAndEarn() {
    useSeo({
        title: 'AyuvaPro Referral Programme | Eligibility & Terms',
        description: 'Review the AyuvaPro referral programme terms, eligibility requirements and reward rules before joining.',
        path: '/refer-and-earn',
    });
    const [searchParams] = useSearchParams();
    const registrationUrl = getMlmPortalUrl({
        register: true,
        referralCode: searchParams.get('ref') || '',
    });
    const loginUrl = getMlmPortalUrl();

    return (
        <Layout>
            <PageHero
                title="Share AyuvaPro With Your Network"
                subtitle="Interested in referring AyuvaPro wellness products? Learn how the referral programme works, who can participate and which terms apply before joining. Programme rewards and eligibility are subject to approved terms."
                backgroundImage={referEarnHero}
                currentPage="Refer & Earn"
            >
                {registrationUrl && loginUrl ? (
                    <div className="flex flex-col justify-center gap-3 px-4 sm:flex-row">
                        <a
                            href={registrationUrl}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#946000] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a97108] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            Create Member Account <ArrowRight size={16} aria-hidden="true" />
                        </a>
                        <a
                            href={loginUrl}
                            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            Member Sign In
                        </a>
                    </div>
                ) : (
                    <p role="status" className="mx-auto max-w-xl rounded-lg border border-white/30 bg-black/20 p-4 text-sm leading-6 text-white">
                        Member Portal access is being configured. Please contact AyuvaPro Support for registration assistance.
                    </p>
                )}
            </PageHero>

            <main className="bg-[#f5f2eb] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <section className="grid items-center gap-6 pb-4 pt-2 md:grid-cols-2 md:gap-10" aria-label="AyuvaPro wellness">
                        <img
                            src={referEarnImage}
                            alt="Fresh green botanical leaves"
                            className="h-64 w-full rounded-[24px] object-cover shadow-sm sm:h-80"
                            loading="lazy"
                        />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b5a08]">AyuvaPro Community</p>
                            <h2 className="mt-3 text-2xl font-bold text-[#123d32] sm:text-3xl">Share Wellness Information Responsibly</h2>
                            <p className="mt-3 text-sm leading-7 text-[#5d6964] sm:text-base">
                                Members share accurate product information with their network under clear programme terms, without medical or guaranteed-results claims.
                            </p>
                        </div>
                    </section>

                    <section className="py-8 sm:py-10" aria-labelledby="referral-steps-heading">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b5a08]">Practitioner &amp; Advocate Ecosystem</p>
                            <h2 id="referral-steps-heading" className="mt-3 text-3xl font-bold text-[#123d32] sm:text-4xl">
                                How Referrals Work
                            </h2>
                        </div>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {steps.map((step, index) => (
                                <article key={step.title} className="rounded-2xl border border-[#e5e0d6] bg-white p-5 shadow-[0_8px_24px_rgba(23,61,58,0.04)] sm:p-6">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9efe8] text-[#315a4c]">
                                        <step.icon size={19} aria-hidden="true" />
                                    </div>
                                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#8b5a08]">Step {index + 1}</p>
                                    <h3 className="mt-1 text-base font-bold text-[#26333e]">{step.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[#626d67]">{step.description}</p>
                                </article>
                            ))}
                        </div>
                        <div className="mt-6 flex gap-3 rounded-xl border border-[#e5dcc8] bg-[#fcfaf5] p-4 sm:p-5">
                            <Info size={19} className="mt-0.5 shrink-0 text-[#8b5a08]" aria-hidden="true" />
                            <p className="text-sm leading-6 text-[#626d67]">
                                <strong className="text-[#173d3a]">Programme notice:</strong> No earnings are guaranteed or stated here. Reward schedules and participation terms must be approved and published before referral rewards are promoted.
                            </p>
                        </div>
                    </section>

                    <section className="py-14 sm:py-16" aria-labelledby="programme-details-heading">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b5a08]">Before you join</p>
                            <h2 id="programme-details-heading" className="mt-3 text-3xl font-bold text-[#123d32] sm:text-4xl">
                                Understand the Programme
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-[#5d6964] sm:text-base">
                                Review the official programme documents and ask for clarification before participating. The portal supports registration and account access; rewards depend on approved programme rules.
                            </p>
                        </div>

                        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {programmeDetails.map((detail) => (
                                <article key={detail.title} className="rounded-2xl border border-[#e5e0d6] bg-white p-5 shadow-[0_8px_24px_rgba(23,61,58,0.04)] sm:p-6">
                                    <CheckCircle2 size={20} className="text-[#39735b]" aria-hidden="true" />
                                    <h3 className="mt-4 text-base font-bold text-[#26333e]">{detail.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[#626d67]">{detail.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#e5dcc8] bg-[#fcfaf5] p-6 sm:p-8" aria-labelledby="referral-help-heading">
                        <div className="flex items-start gap-3">
                            <CircleHelp size={21} className="mt-1 shrink-0 text-[#8b5a08]" aria-hidden="true" />
                            <div>
                                <h2 id="referral-help-heading" className="text-xl font-bold text-[#173d3a]">Need help before registering?</h2>
                                <p className="mt-2 text-sm leading-6 text-[#626d67]">
                                    Contact AyuvaPro Support for questions about the portal, registration or published programme terms.
                                </p>
                                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#315a4c] underline underline-offset-4 hover:text-[#0d766c]">
                                    Contact Support <ArrowRight size={15} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
