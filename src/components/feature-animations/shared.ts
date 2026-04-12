"use client";

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export const DUR = {
  field: 0.8,
  card: 1.0,
  element: 0.7,
  counter: 1.8,
  color: 1.2,
} as const;

export const STAGGER = {
  field: 0.35,
  card: 0.25,
  variant: 0.3,
} as const;
