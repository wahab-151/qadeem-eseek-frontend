'use client';
import { useState, useRef, useEffect } from 'react';
import { Box, Button, ButtonGroup, Divider, Paper, Typography } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Link,
  Image,
  Title,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Undo,
  Redo
} from '@mui/icons-material';

const HTMLEditor = ({ value = '', onChange, placeholder = 'Start writing...' }) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleContentChange();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    handleContentChange();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const ToolbarButton = ({ onClick, children, title, active = false }) => (
    <Button
      size="small"
      onClick={onClick}
      title={title}
      sx={{
        minWidth: 'auto',
        px: 1,
        py: 0.5,
        bgcolor: active ? 'primary.main' : 'transparent',
        color: active ? 'white' : 'text.primary',
        '&:hover': {
          bgcolor: active ? 'primary.dark' : 'action.hover',
        }
      }}
    >
      {children}
    </Button>
  );

  const isCommandActive = (command) => {
    return document.queryCommandState(command);
  };

  return (
    <Paper
      sx={{
        border: (theme) => `1px solid ${isFocused ? theme.palette.primary.main : theme.palette.grey[300]}`,
        borderRadius: 1,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Toolbar */}
      <Box sx={{ p: 1, borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
        <ButtonGroup size="small" sx={{ mr: 1 }}>
          <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
            <Undo fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
            <Redo fontSize="small" />
          </ToolbarButton>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <ButtonGroup size="small" sx={{ mr: 1 }}>
          <ToolbarButton 
            onClick={() => execCommand('bold')} 
            title="Bold"
            active={isCommandActive('bold')}
          >
            <FormatBold fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => execCommand('italic')} 
            title="Italic"
            active={isCommandActive('italic')}
          >
            <FormatItalic fontSize="small" />
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => execCommand('underline')} 
            title="Underline"
            active={isCommandActive('underline')}
          >
            <FormatUnderlined fontSize="small" />
          </ToolbarButton>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <ButtonGroup size="small" sx={{ mr: 1 }}>
          <ToolbarButton onClick={() => execCommand('formatBlock', 'h1')} title="Heading 1">
            <Title fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', 'h2')} title="Heading 2">
            <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>H2</Typography>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', 'h3')} title="Heading 3">
            <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>H3</Typography>
          </ToolbarButton>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <ButtonGroup size="small" sx={{ mr: 1 }}>
          <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
            <FormatListBulleted fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
            <FormatListNumbered fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', 'blockquote')} title="Quote">
            <FormatQuote fontSize="small" />
          </ToolbarButton>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <ButtonGroup size="small" sx={{ mr: 1 }}>
          <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
            <FormatAlignLeft fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
            <FormatAlignCenter fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
            <FormatAlignRight fontSize="small" />
          </ToolbarButton>
        </ButtonGroup>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <ButtonGroup size="small">
          <ToolbarButton onClick={insertLink} title="Insert Link">
            <Link fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="Insert Image">
            <Image fontSize="small" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('formatBlock', 'pre')} title="Code Block">
            <Code fontSize="small" />
          </ToolbarButton>
        </ButtonGroup>
      </Box>

      {/* Editor */}
      <Box
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          minHeight: 300,
          p: 2,
          outline: 'none',
          '&:empty:before': {
            content: `"${placeholder}"`,
            color: 'text.disabled',
            fontStyle: 'italic',
          },
          '& h1': {
            fontSize: '2rem',
            fontWeight: 600,
            margin: '1rem 0',
          },
          '& h2': {
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: '0.8rem 0',
          },
          '& h3': {
            fontSize: '1.25rem',
            fontWeight: 600,
            margin: '0.6rem 0',
          },
          '& p': {
            margin: '0.5rem 0',
            lineHeight: 1.6,
          },
          '& ul, & ol': {
            margin: '0.5rem 0',
            paddingLeft: '1.5rem',
          },
          '& blockquote': {
            borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
            paddingLeft: '1rem',
            margin: '1rem 0',
            fontStyle: 'italic',
            color: 'text.secondary',
          },
          '& pre': {
            backgroundColor: (theme) => theme.palette.grey[100],
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            margin: '1rem 0',
            fontFamily: 'monospace',
          },
          '& code': {
            backgroundColor: (theme) => theme.palette.grey[100],
            padding: '0.2rem 0.4rem',
            borderRadius: '3px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '4px',
            margin: '0.5rem 0',
          },
          '& a': {
            color: (theme) => theme.palette.primary.main,
            textDecoration: 'underline',
          },
        }}
      />
    </Paper>
  );
};

export default HTMLEditor;
