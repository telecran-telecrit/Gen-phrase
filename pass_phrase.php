<?php
$dicts = array();

function fillDict (&$dictSub, $dictFilename, $partOfSpeech='') {
    $dictSub = file($dictFilename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($dictSub as $key => $word) {
        if (strpos($word, '_') !== false) {
            if ($partOfSpeech === 'verbs') {
                $tmp = explode('_', $word);
                $dictSub[$key] = implode(' ', $tmp);
            } else {
                unset($dictSub[$key]);
            }
            continue;
        }
    }
    $dictSub = array_values($dictSub);
}

function _getRandomInt ($fromI, $toI) {
    return random_int($fromI, $toI); // please, do not use simple rand () function
}

function getRandomWord ($partOfSpeech) {
    global $dicts;
    return $dicts[$partOfSpeech][_getRandomInt(0, count($dicts[$partOfSpeech]))];
}

/**
 * Returns a random phrase made up of order
 *  adjective noun verb adjective noun
 */
function main ($sep) {
    global $dicts;
    $dicts = array(
                'nouns', array(),
                'verbs', array(),
                'adjectives', array(),
    );
    
    fillDict($dicts['nouns'], 'nouns.txt', 'nouns');
    fillDict($dicts['verbs'], 'verbs.txt', 'verbs');
    fillDict($dicts['adjectives'], 'adjectives.txt', 'adjectives');
    
    $order = array('adjectives', 'nouns', 'verbs', 'adjectives', 'nouns');
    $result = '';
    
    for ($i=0; $i<count($order); ++$i) {
        if (strlen($result) > 0) {
            $result .= $sep;
        }
        $result .= getRandomWord($order[$i]);
    }
    return $result;
}

$r = main(' ');
echo "<pre>";
echo "$r";
echo "</pre>\n";
?>
