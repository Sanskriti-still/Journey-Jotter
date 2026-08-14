import jsPDF from "jspdf";

export function downloadTripPDF(trip) {
  const pdf = new jsPDF();

  let y = 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("Journey Jotter", 20, y);

  y += 15;

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");

  pdf.text(`Destination: ${trip.destination}`, 20, y);
  y += 10;

  pdf.text(`Duration: ${trip.days} Days`, 20, y);
  y += 10;

  pdf.text(`Budget: ₹${trip.budget}`, 20, y);
  y += 10;

  pdf.text(`Travel Style: ${trip.style}`, 20, y);
  y += 10;

  pdf.text(`Travel Type: ${trip.travelType}`, 20, y);

  y += 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("AI Itinerary", 20, y);

  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  const lines = pdf.splitTextToSize(
    trip.itinerary,
    170
  );

  pdf.text(lines, 20, y);

  pdf.save(`${trip.destination}-Journey-Jotter.pdf`);
}