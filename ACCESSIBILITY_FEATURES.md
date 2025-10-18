# ♿ Accessibility & Customization Features

## Overview

The AI Voice Assistant now includes a comprehensive **Settings & Accessibility Panel** that allows users to personalize their experience and ensure the application works for everyone, regardless of their abilities or preferences.

## 🎨 Theme Customization

### Available Themes
1. **☀️ Light Mode** - Bright, clean interface with soft aqua-to-pink gradients, white cards, optimal for bright environments
2. **🌙 Dark Mode** - Deep slate background with dark blue tones, reduced eye strain, perfect for low-light environments (✨ **FULLY IMPLEMENTED**)
3. **🔄 Auto Mode** - Automatically switches based on system preferences (detects `prefers-color-scheme`)

### Dark Mode Features (NEW! ✨)
- **Background**: Deep gradient from slate (#1e293b) to midnight blue (#0f172a)
- **Cards**: Semi-transparent dark slate (rgba(30, 41, 59, 0.95))
- **Text**: Light slate (#f1f5f9) for primary text, muted slate (#94a3b8) for secondary
- **Borders**: Subtle borders (#334155) for depth without harshness
- **Messages**: 
  - User messages: Blue-purple gradient (#3b82f6 to #8b5cf6)
  - AI messages: Dark slate with subtle borders
- **Inputs**: Dark backgrounds matching the theme with proper contrast
- **Buttons**: Gradient blue-purple matching the dark aesthetic

### How to Use
- Click the settings icon (⚙️) in the top-right corner
- Select your preferred theme from the Theme section
- Changes apply instantly to ALL UI elements and are saved automatically
- Theme persists across browser sessions

---

## 🤖 AI Model Selection

Choose from **3 high-performance AI models** based on your needs:

| Model | Description | Best For |
|-------|-------------|----------|
| **GPT-4o** | Most capable, best for complex tasks | Detailed analysis, creative work, complex reasoning |
| **GPT-4o Mini** | Faster responses, great for quick tasks | Quick questions, simple conversations, efficient processing |
| **GPT-4.1** | Advanced reasoning and analysis | Latest improvements, balanced performance |

### Benefits
- **Performance**: Choose speed vs capability based on your needs
- **Cost Optimization**: Lighter models for simple tasks
- **Flexibility**: Switch models mid-conversation

---

## 💎 Glass UI Customization

### Glass Effect Intensity
Adjust the **backdrop blur and opacity** of UI components:

1. **Subtle** - Minimal blur (8px), lower opacity (0.85)
2. **Medium** - Balanced blur (10px), standard opacity (0.95) - *Default*
3. **Strong** - Maximum blur (20px), highest opacity (0.98)

### Why This Matters
- **Visual Clarity**: Reduce blur if you find text harder to read
- **Performance**: Lower intensity may improve performance on older devices
- **Aesthetics**: Customize to match your visual preferences

---

## 📝 Font Size Options

Three text size presets for comfortable reading:

- **Small** - Compact text (0.875rem base)
- **Medium** - Standard size (1rem base) - *Default*
- **Large** - Enhanced readability (1.125rem base)

### Accessibility Impact
- Helps users with **visual impairments**
- Improves readability for **users with dyslexia**
- Reduces **eye strain** during extended use

---

## ✨ Animation Controls

### Enable/Disable Animations
Toggle all visual animations on or off:
- Fade-in effects
- Bounce animations
- Pulse effects
- Ripple animations
- Shimmer effects
- Spring physics

**When to Disable:**
- To improve performance on slower devices
- Personal preference for static interfaces
- Debugging or development

### Reduce Motion (Accessibility)
Specifically designed for users with **vestibular disorders** or **motion sensitivity**:
- Minimizes animation duration
- Removes potentially disorienting movements
- Respects system-level accessibility settings

**Automatically detects** if your operating system has "Reduce Motion" enabled and applies settings accordingly.

---

## 💾 Automatic Settings Persistence

All your preferences are **automatically saved** to browser localStorage:
- ✅ No account required
- ✅ Survives page refreshes
- ✅ Device-specific settings
- ✅ Instant apply

### Saved Settings Include:
- Theme preference
- Selected AI model
- Glass intensity level
- Font size
- Animation enabled/disabled
- Reduce motion preference

---

## 🎯 How to Access Settings

1. **Click** the settings icon (⚙️) in the top-right corner of the page
2. The settings panel will slide in with a smooth animation
3. Adjust any settings you like - changes apply **immediately**
4. Click outside the panel or press the **✕** button to close
5. Your settings are **automatically saved**

---

## 🔑 Keyboard Accessibility

- **Click settings button**: Mouse or keyboard (Tab + Enter)
- **Navigate settings**: Use Tab key to move between controls
- **Close panel**: Escape key or click outside
- **Toggle mic**: Ctrl + Space (existing shortcut)

---

## 🌟 Apple-Inspired Design Philosophy

### Spring Physics Animations
Smooth, natural animations using **cubic-bezier easing functions** that mimic real-world physics:
- `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring-like bounces
- Subtle scale transformations (0.98x on press, 1.02x on hover)
- Smooth transitions with carefully tuned timings

### Glass Morphism
**Frosted glass effect** inspired by macOS Big Sur and iOS design language:
- Multi-layer blur with backdrop filters
- Semi-transparent backgrounds
- Elegant depth and hierarchy
- Professional, modern aesthetic

---

## 📊 WCAG Compliance

The settings panel adheres to **Web Content Accessibility Guidelines (WCAG) 2.1**:

- ✅ **Level AA** color contrast ratios
- ✅ Keyboard navigable
- ✅ Screen reader compatible with ARIA labels
- ✅ Focus indicators on all interactive elements
- ✅ Reduce motion support
- ✅ Resizable text without loss of functionality

---

## 🎨 Technical Implementation

### Technologies Used
- **React Hooks**: `useState`, `useEffect`, `useRef` for state management
- **localStorage API**: Persistent settings storage
- **CSS-in-JS**: Dynamic styling based on settings
- **Media Queries**: System preference detection
- **CSS Animations**: Hardware-accelerated transforms

### Code Quality
- Type-safe settings management
- Defensive programming (fallbacks for missing localStorage)
- Performance optimized (debounced saves)
- Clean, maintainable code structure

---

## 🚀 Future Enhancements

Potential additions for version 2.0:
- 🎨 Custom color scheme creator
- 🗣️ Voice selection (male/female, accents)
- 🌍 Multi-language support
- 📱 Mobile-specific optimizations
- 💬 Conversation templates
- 🔊 Volume control for TTS
- ⏱️ Speech rate control

---

## 💡 Best Practices

### For Users
1. **Try different themes** to find what's most comfortable
2. **Start with GPT-4o** for best quality, switch to faster models as needed
3. **Enable Reduce Motion** if you're sensitive to animations
4. **Adjust font size** for comfortable reading during long sessions
5. **Use keyboard shortcuts** (Ctrl + Space) for faster interaction

### For Developers
- Settings architecture is **extensible** - easy to add new options
- All settings use **centralized state management**
- localStorage keys are **prefixed** (`voicebot-*`) to avoid conflicts
- Theme colors are **tokenized** for easy customization

---

## 📞 Support

If you experience any issues with accessibility features:
1. Check browser console for errors
2. Clear browser cache and localStorage
3. Try a different browser (Chrome recommended)
4. Reset to default settings by clearing localStorage

---

**Built with accessibility in mind. Designed for everyone.** ♿✨
