/** Link to the enquiry form with the visitor's choice already filled in. */
export const enquiryHref = (p: { service?: string; destination?: string; note?: string }) => {
  const q = new URLSearchParams();
  if (p.service) q.set("service", p.service);
  if (p.destination) q.set("destination", p.destination);
  if (p.note) q.set("note", p.note);
  return `/contact?${q.toString()}#enquire`;
};
