"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Gauge, Target, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { glass } from "@/styles/glass";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  simulatorCountries,
  simulatorDevices,
  simulatorFormats,
  simulatorIntro,
} from "@/data/ad-formats";

function LiveNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22, mass: 0.6 });
  const display = useTransform(spring, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}

function OptionGroup<T extends { id: string; label: string }>({
  options,
  activeId,
  onSelect,
}: {
  options: T[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                : "bg-foreground/[0.04] text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function AdFormatsRevenueSimulatorSection() {
  const [traffic, setTraffic] = useState(500000);
  const [countryId, setCountryId] = useState(simulatorCountries[0].id);
  const [deviceId, setDeviceId] = useState(simulatorDevices[0].id);
  const [formatId, setFormatId] = useState<string>(simulatorFormats[0].id);

  const country = simulatorCountries.find((c) => c.id === countryId) ?? simulatorCountries[0];
  const device = simulatorDevices.find((d) => d.id === deviceId) ?? simulatorDevices[0];
  const format = simulatorFormats.find((f) => f.id === formatId) ?? simulatorFormats[0];

  const { revenue, effectiveRpm, fillRate } = useMemo(() => {
    const rpm = format.baseRpm * country.multiplier * device.multiplier;
    const monthlyRevenue = (traffic / 1000) * rpm;
    const fill = Math.min(99, Math.round(70 + device.multiplier * 20 + country.multiplier * 8));
    return { revenue: monthlyRevenue, effectiveRpm: rpm, fillRate: fill };
  }, [traffic, country, device, format]);

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      <SectionHeading {...simulatorIntro} className="mx-auto mb-14 max-w-2xl" />

      <div className={cn(glass.base, glass.light, "mx-auto grid max-w-4xl gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-2")}>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">Monthly Traffic</span>
              <span className="text-muted-foreground">{traffic.toLocaleString()} pageviews</span>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={traffic}
              onChange={(event) => setTraffic(Number(event.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              aria-label="Monthly traffic"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">Country</p>
            <OptionGroup options={simulatorCountries} activeId={countryId} onSelect={setCountryId} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">Device</p>
            <OptionGroup options={simulatorDevices} activeId={deviceId} onSelect={setDeviceId} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">Format</p>
            <OptionGroup options={simulatorFormats} activeId={formatId} onSelect={setFormatId} />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 rounded-2xl bg-foreground/[0.03] p-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Estimated Monthly Revenue</p>
            <p className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
              <LiveNumber value={revenue} prefix="$" decimals={0} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-background/60 p-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary-text ring-1 ring-primary/20">
                <Gauge className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">
                  <LiveNumber value={effectiveRpm} prefix="$" decimals={2} />
                </p>
                <p className="text-[10px] text-muted-foreground">Effective RPM</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-background/60 p-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary-text ring-1 ring-secondary/20">
                <Target className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">
                  <LiveNumber value={fillRate} suffix="%" decimals={0} />
                </p>
                <p className="text-[10px] text-muted-foreground">Est. Fill Rate</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="size-3.5 text-accent-text" aria-hidden="true" />
            Updates instantly as you adjust the inputs.
          </div>
        </div>
      </div>
    </Section>
  );
}
