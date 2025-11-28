<?php
header("Content-Type: application/json");
$dataFile = "data.json";

$method = $_GET['action'] ?? '';

$data = json_decode(file_get_contents($dataFile), true);

// --- Tambah View ---
if ($method === "view") {
    $data["views"]++;
}

// --- Tambah Like ---
if ($method === "like") {
    $data["likes"]++;
}

// --- Simpan perubahan ---
file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

// --- Kirim balik data ---
echo json_encode($data);
?>
