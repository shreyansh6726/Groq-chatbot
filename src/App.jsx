// src/App.jsx

// We define the styles object here for the layout and animation keys
const styles = {
  // Styles for the main container (App) to center content
  container: {
    display: 'flex',
    justifyContent: 'flex-end', /* Pushes content to the right side */
    alignItems: 'center', /* Centers content vertically */
    width: '100%',
    height: '100%',
    paddingRight: '10%', /* Small offset from the edge for aesthetic */
    // Ensure the container is ready for animation usage
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Styles for the text to apply color and animation
  heading: {
    fontSize: '5rem', /* Large text for landing page */
    color: 'var(--color2)', /* Using the dark color from your palette */
    opacity: 0, /* Start completely hidden */
    transform: 'translateY(20px)', /* Start 20px below its final position */
    animation: 'riseAndFadeIn 1.5s ease-out 0.5s forwards', /* Animation definition */
  },
};

// Define the keyframes for the animation using a separate <style> block,
// as defining keyframes directly in React's style prop is not possible.
const AnimationStyles = () => (
  <style>
    {`
      @keyframes riseAndFadeIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
  </style>
);


function App() {
  return (
    <>
      <AnimationStyles />
      <div style={styles.container}>
        <h1 style={styles.heading}>Groq Chatbot</h1>
      </div>
    </>
  );
}

export default App;