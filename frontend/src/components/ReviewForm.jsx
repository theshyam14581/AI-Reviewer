function ReviewForm({
  formData,
  handleChange,
  handleGenerate,
  loading
}) {

  return (

    <form
      onSubmit={handleGenerate}
      className="
      bg-[#111]
      p-8
      rounded-2xl
      border
      border-cyan-500/20
      "
    >

      <input
        type="text"
        name="websiteUrl"
        placeholder="Website URL"
        value={formData.websiteUrl}
        onChange={handleChange}
        className="
        w-full
        p-4
        mb-4
        rounded-lg
        bg-[#1b1b1b]
        "
      />

      <input
        type="text"
        name="websiteName"
        placeholder="Website Name"
        value={formData.websiteName}
        onChange={handleChange}
        className="
        w-full
        p-4
        mb-4
        rounded-lg
        bg-[#1b1b1b]
        "
      />

      <textarea
        rows="5"
        name="websiteDescription"
        placeholder="Description"
        value={formData.websiteDescription}
        onChange={handleChange}
        className="
        w-full
        p-4
        rounded-lg
        bg-[#1b1b1b]
        "
      />

      <button
        disabled={loading}
        className="
        mt-5
        w-full
        p-4
        bg-gradient-to-r
        from-red-600
        to-cyan-500
        rounded-lg
        font-bold
        "
      >
        {
          loading
          ? "Generating..."
          : "Generate AI Review"
        }
      </button>

    </form>

  );
}

export default ReviewForm;