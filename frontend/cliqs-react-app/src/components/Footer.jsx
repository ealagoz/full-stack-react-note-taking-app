export default function Footer() {
  return (
    <div className="footer-content">
      <div className="footer-brand">
        <h3>Notes App</h3>
        <p>Organize your thoughts, capture ideas</p>
      </div>
      <div className="footer-links">
        <p>Contact: hello@notesapp.com</p>
        <p>Follow us: @notesapp</p>
      </div>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Notes App. All rights reserved.</p>
        <p>Made with ♥ by Notes App Team</p>
      </div>
    </div>
  );
}
