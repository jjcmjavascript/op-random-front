import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function MuiImageWithLoader({
  src,
  alt = "",
  width,
  height,
  sx,
  imgSx,
  loading = "lazy", // "lazy" | "eager"
  decoding = "async", // "async" | "sync" | "auto"
  fetchPriority = "auto", // "high" | "low" | "auto" (Chrome)
  onLoad,
  onError,
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width,
        height,
        ...sx,
      }}
    >
      {!loaded && !error && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            zIndex: 1,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            typography: "caption",
            color: "text.secondary",
            zIndex: 1,
          }}
        >
          Error al cargar
        </Box>
      )}

      <Box
        component="img"
        key={src}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        draggable={false}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        onError={(e) => {
          setError(true);
          onError?.(e);
        }}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 200ms ease",
          display: "block",
          ...imgSx,
        }}
      />
    </Box>
  );
}
