
function ReviewForm({
  formData,
  handleChange,
  handleGenerate,
  loading,
}) {
  return (
    <form
      onSubmit={handleGenerate}
      className="w-full rounded-2xl border border-white/10 bg-[#111218] p-5 text-white shadow-xl shadow-black/20 sm:p-7 lg:p-8"
    >
      {/* Form Header */}
      <div className="mb-7 border-b border-white/10 pb-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          AI-Powered Analysis
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Generate Website Review
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Enter your website details to generate an AI-powered review.
        </p>
      </div>

      {/* Website URL */}
      <div className="mb-5">
        <label
          htmlFor="websiteUrl"
          className="mb-2 block text-sm font-semibold text-gray-200"
        >
          Website URL <span className="text-red-400">*</span>
        </label>

        <input
          id="websiteUrl"
          type="url"
          name="websiteUrl"
          placeholder="https://example.com"
          value={formData.websiteUrl}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-white/10 bg-[#191a22] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
        />
      </div>

      {/* Website Name */}
      <div className="mb-5">
        <label
          htmlFor="websiteName"
          className="mb-2 block text-sm font-semibold text-gray-200"
        >
          Website Name <span className="text-red-400">*</span>
        </label>

        <input
          id="websiteName"
          type="text"
          name="websiteName"
          placeholder="Enter your website name"
          value={formData.websiteName}
          onChange={handleChange}
          required
          maxLength={100}
          className="w-full rounded-xl border border-white/10 bg-[#191a22] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
        />
      </div>

      {/* Website Description */}
      <div className="mb-2">
        <label
          htmlFor="websiteDescription"
          className="mb-2 block text-sm font-semibold text-gray-200"
        >
          Website Description{" "}
          <span className="text-red-400">*</span>
        </label>

        <textarea
          id="websiteDescription"
          rows={5}
          name="websiteDescription"
          placeholder="Describe your website, its purpose, features, and target audience..."
          value={formData.websiteDescription}
          onChange={handleChange}
          required
          maxLength={2000}
          className="w-full resize-y rounded-xl border border-white/10 bg-[#191a22] px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
        />

        <p className="mt-2 text-right text-xs text-gray-500">
          {formData.websiteDescription.length}/2000 characters
        </p>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-cyan-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-red-500/10 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
            Generating Review...
          </>
        ) : (
          <>
            <span className="text-lg">✦</span>
            Generate AI Review
            <span className="text-lg">→</span>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-gray-500">
        Provide accurate website details for a more relevant review.
      </p>
    </form>
  );
}

export default ReviewForm;
