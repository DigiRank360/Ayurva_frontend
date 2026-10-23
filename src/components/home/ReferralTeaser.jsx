import { ArrowRight, Info, Leaf, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMlmPortalUrl } from '@/lib/mlmPortal';
import referEarnImage from '@/assets/refer-earn.png';

const steps = [
    {
        title: 'Join & Register',
        description: 'Create a member account through our dedicated member portal and complete the requested onboarding steps.',
        icon: Users,
    },
    {
        title: 'Share Your Referral Link',
        description: 'Share product information with your network using the personal referral link from the portal.',
        icon: Leaf,
    },
    {
        title: 'Referral Review',
        description: 'Referral activity is reviewed under the published programme rules and verification process.',
        icon: ShieldCheck,
    },
];

export default function ReferralTeaser() {
    const registrationUrl = getMlmPortalUrl({ register: true });

    return (
        <section className="relative overflow-hidden bg-[#0f2a1d] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8" aria-labelledby="referral-teaser-heading">
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#946000]/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#1d534f]/40 blur-3xl" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e5c27f]/40 bg-[#946000]/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f3d7aa]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f3d7aa]" aria-hidden="true" />
                        Practitioner &amp; Advocate Ecosystem
                    </span>
                    <h2 id="referral-teaser-heading" className="mt-5 font-serif text-3xl font-bold leading-tight text-[#f3d7aa] sm:text-4xl lg:text-5xl">
                        Share AyuvaPro With Your Network
                    </h2>
                    <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#e5c27f] to-transparent" aria-hidden="true" />
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                        Interested in referring AyuvaPro products? Review the programme terms, eligibility requirements and reward rules before joining.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <article
                                    key={step.title}
                                    className="group relative rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#e5c27f]/40 hover:bg-white/[0.09]"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#946000] text-white shadow-lg shadow-black/20">
                                            <Icon size={18} aria-hidden="true" />
                                        </span>
                                        <span className="font-serif text-3xl font-bold text-white/15 transition group-hover:text-[#e5c27f]/40">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 font-bold text-white">{step.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-white/65">{step.description}</p>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex gap-3 rounded-xl border border-[#e5c27f]/25 bg-[#e5c27f]/[0.07] p-4">
                        <Info size={19} className="mt-0.5 shrink-0 text-[#e5c27f]" aria-hidden="true" />
                        <p className="text-sm leading-6 text-white/75">
                            <strong className="text-white">Notice:</strong> No earnings are guaranteed or stated here. Participation is subject to approved programme terms.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/refer-and-earn"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#946000] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-[#a97108] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a1d]"
                        >
                            Understand the Referral Programme <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                        {registrationUrl && (
                            <a
                                href={registrationUrl}
                                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3d7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a1d]"
                            >
                                Partner Registration Details
                            </a>
                        )}
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="absolute -inset-3 rounded-[32px] border border-[#e5c27f]/25" aria-hidden="true" />
                    <figure className="relative overflow-hidden rounded-[28px] shadow-2xl shadow-black/40">
                        <img
                            src={referEarnImage}
                            alt="AyuvaPro wellness community"
                            loading="lazy"
                            className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[540px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a1d]/80 via-transparent to-transparent" />
                        <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3d7aa]">Referral programme</p>
                                <p className="mt-1 text-sm font-semibold leading-6 text-white">Clear terms, eligibility and reward rules — reviewed before you join.</p>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
