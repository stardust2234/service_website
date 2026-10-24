import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import AnimatedRoutes from "@/components/AnimatedRoutes";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import { BookingButton } from "@/components/BookingButton";
import AdminCalculator from "@/components/AdminCalculator";
import LegalPage from "@/pages/LegalPage";
import Article from "@/pages/Article";
import { legalDocuments } from "@/config/legal";

describe("application navigation", () => {
  it("navigates from the article index to an article detail route", async () => {
    render(
      <MemoryRouter initialEntries={["/articles"]}>
        <AnimatedRoutes />
      </MemoryRouter>,
    );

    await screen.findByRole("heading", { name: /practical notes for busy owners/i });
    fireEvent.click(screen.getAllByRole("link", { name: /read article/i })[0]);

    expect(await screen.findByRole("heading", { name: /drowning in business admin/i })).toBeInTheDocument();
  });
});

describe("mobile navigation", () => {
  it("opens and closes the mobile menu", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const menuButton = screen.getAllByRole("button", { name: "Open menu" })[0];
    fireEvent.click(menuButton);
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    expect(document.querySelector('[aria-label="Mobile navigation"]')?.parentElement).toHaveAttribute("aria-hidden", "false");

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getAllByRole("button", { name: "Open menu" })[0]).toBeInTheDocument();
  });
});

describe("service accordions", () => {
  it("opens one service and exposes its details", () => {
    render(<ServicesSection />);

    const serviceButton = screen.getByRole("button", { name: "Productivity & delegation" });
    expect(serviceButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(serviceButton);

    expect(serviceButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Inbox and calendar triage")).toBeVisible();
  });
});

describe("booking flow", () => {
  it("uses the Cal.com booking URL for booking buttons", () => {
    render(<BookingButton label="Book a free call" />);

    expect(screen.getByRole("link", { name: /book a free call/i })).toHaveAttribute(
      "href",
      "https://cal.com/propelup/20min",
    );
  });
});

describe("admin calculator", () => {
  it("calculates totals, enforces limits, and resets values", () => {
    render(<AdminCalculator />);

    const totals = document.querySelector("[aria-live='polite']");
    expect(totals).toHaveTextContent("12");
    expect(totals).toHaveTextContent("52");

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "35" } });
    expect(totals).toHaveTextContent("35");
    expect(totals).toHaveTextContent("150");

    fireEvent.click(screen.getByRole("button", { name: "Reset calculator" }));
    expect(totals).toHaveTextContent("12");
  });
});

describe("content rendering", () => {
  it("renders a legal Markdown document with site content", () => {
    render(
      <MemoryRouter>
        <LegalPage documentKey="privacy" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getByText(/respects your privacy/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /contact@propelup.co.uk/i })[0]).toHaveAttribute(
      "href",
      "mailto:contact@propelup.co.uk",
    );
  });

  it("renders an article and its calculator link", async () => {
    render(
      <MemoryRouter initialEntries={["/articles/bookkeeper-vs-accountant"]}>
        <Routes>
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByRole("heading", { name: /bookkeeper vs accountant/i })).toBeInTheDocument());
    expect(screen.getByRole("link", { name: /try the admin calculator/i })).toHaveAttribute("href", "/tools");
  });
});

describe("Cloudflare SPA fallback", () => {
  it("configures unknown paths to be served by the SPA", async () => {
    const wranglerConfig = await import("node:fs/promises").then(({ readFile }) => readFile("wrangler.toml", "utf8"));
    expect(wranglerConfig).toContain('not_found_handling = "single-page-application"');
  });

  it("serves a deep route in a deployed environment when DEPLOYMENT_URL is provided", async () => {
    const deploymentUrl = process.env.DEPLOYMENT_URL;
    if (!deploymentUrl) return;

    const response = await fetch(`${deploymentUrl.replace(/\/$/, "")}/articles/bookkeeper-vs-accountant`);
    expect(response.ok).toBe(true);
    expect(await response.text()).toContain('<div id="root"></div>');
  });
});
