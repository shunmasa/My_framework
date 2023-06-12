<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Teaching Page</title>
</head>
<body>
    <h1>Teaching Page</h1>
    
    <?php if ($showContent): ?>
        <h2>Teaching Data</h2>
        <?php foreach ($data['teachingData'] as $teachingItem): ?>
            <div>
                <h3><?php echo $teachingItem['name']; ?></h3>
                <p><?php echo $teachingItem['slug']; ?></p>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>No content to show.</p>
    <?php endif; ?>
    
    <script>
        // Replace {language} placeholder with the actual language value
        var endpoint = "<?php echo str_replace('{language}', $data['language'], $endpoint); ?>";
     
    </script>
</body>
</html>
